import express from "express"
import rootHandler from "../controllers/rootHandler"
const router = express.Router()

router.get("/", rootHandler.getAll)
router.patch("/", rootHandler.update)
router.post("/", rootHandler.getById)
router.get("/search", rootHandler.getSorted)

export default router
