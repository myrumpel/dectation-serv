import express from "express"
const router = express.Router()

import rootRouter from "./root"

router.use("/data", rootRouter)

export default router
