"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./route/user");
const post_1 = require("./route/post");
const app = (0, express_1.default)();
app.use((req, res, next) => { console.log('Request'), next(); });
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use('/user', user_1.user);
app.use('/post', post_1.post);
app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});
//# sourceMappingURL=index.js.map