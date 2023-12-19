import db from "../db/connectDb"
class RootService {
  async getAll() {
    try {
      const result = await db
        .query("SELECT * FROM task")
        .then((data) => console.log())
        .catch((error) => {
          throw new Error()
        })
      return result
    } catch (error) {
      if (error instanceof Error)
        console.error(
          `Произошла ошибка в запросе к базе данных - ${error.message}`
        )
      throw error
    }
  }
}

export default new RootService()
