import express from 'express'
import router from './routes'

import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.APP_PORT
app.use(express.json())

app.use(router)
app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

export default app
