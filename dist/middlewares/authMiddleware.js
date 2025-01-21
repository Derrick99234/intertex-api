"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_process_helper_1 = require("../utils/helper/jwt-process.helper");
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Bearer token
    if (!token)
        return res.status(401).json({ message: "No token provided" });
    try {
        const decoded = (0, jwt_process_helper_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.authenticate = authenticate;
