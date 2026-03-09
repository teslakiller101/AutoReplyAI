"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretfallback';
const signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    businessName: zod_1.z.string().min(2),
});
const signup = async (req, res) => {
    try {
        const body = signupSchema.safeParse(req.body);
        if (!body.success) {
            res.status(400).json({ error: 'Invalid input', details: body.error });
            return;
        }
        const { email, password, businessName } = body.data;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Email already in use' });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                business: {
                    create: {
                        name: businessName,
                    },
                },
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ user: { id: user.id, email: user.email }, token });
    }
    catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password required' });
            return;
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ user: { id: user.id, email: user.email }, token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { business: true },
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                business: user.business,
            },
        });
    }
    catch (error) {
        console.error('GetMe error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getMe = getMe;
