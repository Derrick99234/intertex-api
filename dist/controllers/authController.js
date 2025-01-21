"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.login = login;
const auth_model_1 = __importDefault(require("../models/auth.model"));
const bcryptjs = __importStar(require("bcryptjs"));
const jwt_process_helper_1 = require("../utils/helper/jwt-process.helper");
function createUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, email, firstName, lastName } = request.body;
        try {
            if (!username || !password || !email || !firstName || !lastName) {
                return response.status(400).json({ message: "All fields are required" });
            }
            const hashedPassword = bcryptjs.hashSync(password, 10);
            const user = new auth_model_1.default({
                username,
                password: hashedPassword,
                email,
                firstName,
                lastName,
            });
            yield user.save();
            const payload = {
                id: String(user._id),
                email,
            };
            const token = (0, jwt_process_helper_1.generateToken)(payload);
            response
                .status(201)
                .json({ message: "User created successfully", user, token });
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ message: "Error creating user", error });
        }
    });
}
function login(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = request.body;
            if (!username || !password) {
                return response.status(400).jsonp();
            }
            const user = yield auth_model_1.default.findOne({
                $or: [{ username }, { email: username }],
            });
            if (!user) {
                return response.status(404).json({ message: "User not found" });
            }
            const isMatch = yield bcryptjs.compare(password, user.password);
            if (!isMatch) {
                return response.status(400).json({ message: "Invalid credentials" });
            }
            const payload = {
                id: String(user._id),
                email: user.email,
            };
            const token = (0, jwt_process_helper_1.generateToken)(payload);
            response.status(200).json({
                message: "Login successful",
                user,
                token,
            });
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ message: "Error logining user", error });
        }
    });
}
