import express from "express"
import dotenv from "dotenv"
import router from "./routes"
import morgan from "morgan"
import cors from "cors"
dotenv.config()
const { PORT } = process.env
const app = express()
app.use(express.json())
app.use(cors())

app.use(morgan("dev"))
app.use(router)

app.listen(PORT, () => {
  console.log(`Сервер работает на ${PORT} порту...`)
})
