import express from 'express'
import router from './routes'
import dotenv from 'dotenv'
import { associations } from './db/models/associatons'

dotenv.config()

const app = express()
const port = process.env.APP_PORT

router(app)
associations()

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

export default app
