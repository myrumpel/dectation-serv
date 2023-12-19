import initDB from "pg-promise"
const pgp = initDB()
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()
const envPath = ".env"
if (!fs.existsSync(envPath)) {
  console.error("Отсутствует файл переменного окружения - envPath")
  process.exit(1)
}
const { DB_U_NAME, DB_NAME, DB_PASSWORD, DB_HOST } = process.env
if (!DB_U_NAME || !DB_NAME || !DB_PASSWORD || !DB_HOST) {
  console.error("Отсутствует одна из констант переменного окружения.")
}
const initOptions = {
  database: DB_NAME,
  host: DB_HOST,
  user: DB_U_NAME,
  password: DB_PASSWORD,
  port: 5432,
}
const db = pgp(initOptions)
export default db
