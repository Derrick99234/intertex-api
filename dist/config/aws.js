"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_s3_1 = __importDefault(require("multer-s3"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Ensure environment variables are properly set
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
if (!accessKeyId || !secretAccessKey || !region || !bucketName) {
    throw new Error("Missing AWS credentials or bucket name in environment variables");
}
// Initialize S3 client (No need for a custom `endpoint`)
const s3 = new client_s3_1.S3Client({
    region: "eu-north-1",
    credentials: { accessKeyId, secretAccessKey },
});
// Configure Multer with S3 storage
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3,
        bucket: bucketName,
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE, // Automatically set content type
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `uploads/${Date.now()}_${file.originalname}`);
        },
    }),
});
exports.default = upload;
