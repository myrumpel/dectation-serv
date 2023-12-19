"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rootHandler_1 = __importDefault(require("../controllers/rootHandler"));
const router = express_1.default.Router();
router.get("/", rootHandler_1.default.getAll);
router.patch("/", rootHandler_1.default.update);
router.post("/", rootHandler_1.default.getById);
router.get("/search", rootHandler_1.default.getSorted);
exports.default = router;
