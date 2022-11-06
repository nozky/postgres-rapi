"use strict";
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
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.user = express_1.default.Router();
// add user
exports.user.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const user = yield prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                age: body.age
            }
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
//update user
exports.user.post('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: body.id },
            data: {
                name: body === null || body === void 0 ? void 0 : body.name,
                email: body === null || body === void 0 ? void 0 : body.email,
                age: body === null || body === void 0 ? void 0 : body.age
            }
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
// delete user
exports.user.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(`Deleting id ${body.id}`);
        const deletePost = prisma.post.deleteMany({ where: { authorId: body.id } });
        const deleteUser = prisma.user.delete({ where: { id: body.id } });
        const user = yield prisma.$transaction([deletePost, deleteUser]);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
// find all users
exports.user.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            orderBy: { id: 'asc' }
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
// find user by id
exports.user.get('/id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const user = yield prisma.user.findUnique({
            where: { id: query.id },
            include: { post: true }
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
// find user name contain any string
exports.user.get('/name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    try {
        const users = yield prisma.user.findMany({
            where: { name: { contains: query.name } }
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=user.js.map