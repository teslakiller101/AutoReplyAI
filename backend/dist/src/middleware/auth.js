"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretfallback';
const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Unauthorized: No token provided' });
            return;
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
            return;
        }
        req.user = { id: user.id, role: user.role };
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
        return;
    }
};
exports.requireAuth = requireAuth;
