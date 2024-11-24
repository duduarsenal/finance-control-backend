import express from 'express'
import cors from 'cors'
import { serverRoutes } from '@routes'

const server = express()

server.use(express.json())
server.use(cors())
server.use(serverRoutes)

server.listen(3000, () => {
    console.log('Servidor conectado na porta: 3000')
})
