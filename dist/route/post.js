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
exports.post = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.post = express_1.default.Router();
//add post
exports.post.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('post');
    try {
        const { title, body, authorId } = req.body;
        const post = yield prisma.post.create({
            data: {
                title,
                body,
                authorId
            }
        });
        res.status(200).json(post);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
// update post
exports.post.post('/update', (req, res) => {
    const body = req.body;
    try {
        prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                body: body.body,
                authorId: body.authorId
            }
        });
    }
    catch (error) {
        res.status(400).json(error === null || error === void 0 ? void 0 : error.message);
    }
});
// find all post
exports.post.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=post.js.map