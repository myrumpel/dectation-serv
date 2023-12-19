"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envPath = ".env";
if (!fs_1.default.existsSync(envPath)) {
    console.error("Отсутствует файл переменного окружения - envPath");
    process.exit(1);
}
const { DB_U_NAME, DB_NAME, DB_PASSWORD, DB_HOST } = process.env;
if (!DB_U_NAME || !DB_NAME || !DB_PASSWORD || !DB_HOST) {
    console.error("Отсутствует одна из констант переменного окружения.");
}
const initOptions = {
    database: DB_NAME,
    host: DB_HOST,
    user: DB_U_NAME,
    password: DB_PASSWORD,
    port: 5432,
};
const db = pgp(initOptions);
exports.default = db;
