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
const connectDb_1 = __importDefault(require("../db/connectDb"));
class rootHandler {
    constructor() { }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbResp = yield connectDb_1.default
                .query(`SELECT * FROM task 
        ORDER BY id 
        LIMIT 200
      `)
                .then((data) => res.json(data))
                .catch((err) => console.error("Ошибка при выполнении запроса в базу данных."));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = req.body.offset;
            console.log(offset);
            yield connectDb_1.default
                .query(`SELECT *
        FROM task 
        ORDER BY id 
        LIMIT 200 OFFSET ${offset}
        
      `)
                .then((data) => res.json(data))
                .catch((err) => console.error("Ошибка при выполнении запроса в базу данных."));
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqId = req.body.id;
                const dbResp = yield connectDb_1.default.query(`SELECT * FROM task WHERE id = $1`, [reqId]);
                if (dbResp.length > 0) {
                    res.status(200).json(dbResp);
                }
                else {
                    res.status(404).json({ error: "Запись не найдена" });
                }
            }
            catch (err) {
                console.error("Ошибка при выполнении запроса в базу данных:", err);
                res.status(500).json({ error: "Внутренняя ошибка сервера" });
            }
        });
    }
    getSorted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.query.sort;
                if (params === "id") {
                    const dbResp = yield connectDb_1.default
                        .query(`SELECT * FROM task 
          ORDER BY id 
          LIMIT 200
        `)
                        .then((data) => res.json(data))
                        .catch((err) => console.error("Ошибка при выполнении запроса в базу данных."));
                }
                else {
                    const dbResp = yield connectDb_1.default.query(`
        select *
        from task 
        order by count_mistakes ${params === "desc" ? "DESC" : "ASC"}
        limit 300
      `);
                    if (dbResp.length > 0) {
                        res.status(200).json(dbResp);
                    }
                    else {
                        res.status(404).json({ error: "Сортировка не сработала" });
                    }
                }
            }
            catch (err) {
                console.error("Ошибка при выполнении запроса в базу данных:", err);
                res.status(500).json({ error: "Внутренняя ошибка сервера" });
            }
        });
    }
}
exports.default = new rootHandler();
