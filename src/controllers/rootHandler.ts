import { Request, Response } from "express"
import db from "../db/connectDb"
class rootHandler {
  constructor() {}

  async getAll(req: Request, res: Response) {
    const dbResp = await db
      .query(
        `SELECT * FROM task 
        ORDER BY id 
        LIMIT 200
      `
      )
      .then((data) => res.json(data))
      .catch((err) =>
        console.error("Ошибка при выполнении запроса в базу данных.")
      )
  }
  async update(req: Request, res: Response) {
    const offset = req.body.offset
    console.log(offset)
    await db
      .query(
        `SELECT *
        FROM task 
        ORDER BY id 
        LIMIT 200 OFFSET ${offset}
        
      `
      )
      .then((data) => res.json(data))
      .catch((err) =>
        console.error("Ошибка при выполнении запроса в базу данных.")
      )
  }
  async getById(req: Request, res: Response) {
    try {
      const reqId = req.body.id
      const dbResp = await db.query(`SELECT * FROM task WHERE id = $1`, [reqId])
      if (dbResp.length > 0) {
        res.status(200).json(dbResp)
      } else {
        res.status(404).json({ error: "Запись не найдена" })
      }
    } catch (err) {
      console.error("Ошибка при выполнении запроса в базу данных:", err)
      res.status(500).json({ error: "Внутренняя ошибка сервера" })
    }
  }
  async getSorted(req: Request, res: Response) {
    try {
      const params = req.query.sort
      if (params === "id") {
        const dbResp = await db
          .query(
            `SELECT * FROM task 
          ORDER BY id 
          LIMIT 200
        `
          )
          .then((data) => res.json(data))
          .catch((err) =>
            console.error("Ошибка при выполнении запроса в базу данных.")
          )
      } else {
        const dbResp = await db.query(
          `
        select *
        from task 
        order by count_mistakes ${params === "desc" ? "DESC" : "ASC"}
        limit 300
      `
        )

        if (dbResp.length > 0) {
          res.status(200).json(dbResp)
        } else {
          res.status(404).json({ error: "Сортировка не сработала" })
        }
      }
    } catch (err) {
      console.error("Ошибка при выполнении запроса в базу данных:", err)
      res.status(500).json({ error: "Внутренняя ошибка сервера" })
    }
  }
}

export default new rootHandler()
