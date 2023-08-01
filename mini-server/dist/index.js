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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mysql_1 = require("./db/mysql");
const JWTTOKEN = "HELLOWORLD";
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("<h1>Welcome</h1>");
});
app.get("/practice-signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = "2duckchun";
    const password = "123456789";
    const nickname = "2DC";
    const hash = yield bcrypt_1.default.hash(password, 15);
    mysql_1.connection.query(`INSERT INTO users(id, password, nickname) VALUES('${id}', '${hash}', '${nickname}')`, (err, results, fields) => {
        if (err) {
            res.status(400).json({
                statusCode: 404,
                message: "잘못된 요청입니다.",
            });
        }
        else {
            res.status(200).json({
                statusCode: 200,
                message: "올바른 요청입니다.",
            });
        }
    });
}));
app.get("/make-token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqId = "2duckchun";
    const reqPassword = "123456789";
    mysql_1.connection.query(`SELECT id, password, nickname FROM users WHERE id = '${reqId}'`, (err, results, fields) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.json({
                statusCode: 400,
                message: "유효하지 않은 로그인입니다.",
            });
        }
        const isCorrect = yield bcrypt_1.default.compare(reqPassword, results[0].password);
        if (isCorrect) {
            const token = jsonwebtoken_1.default.sign({
                id: results[0].id,
                nickname: results[0].nickname,
            }, JWTTOKEN, {
                expiresIn: 300 * 1000,
                issuer: "2duckchun",
            });
            return res.json({
                statusCode: 200,
                message: "토큰이 발급되었습니다.",
                token,
            });
        }
    }));
}));
app.get("/verify-token", (req, res) => {
    console.log(req.headers.authorization);
    res.send("<h1>토큰 확인</h1>");
});
app.get("/practice", (req, res) => {
    mysql_1.connection.query("SELECT * FROM books", ["Page", 45], (err, results, fields) => {
        res.json(results);
    });
});
app.listen(5000, () => {
    console.log("5000번 포트 개방");
});
