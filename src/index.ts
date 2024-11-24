import express from 'express'
import cors from 'cors'
import { serverRoutes } from '@routes'
import { server_port } from '@configs'
import { ExceptionMiddleware } from '@middlewares'

const server = express()

server.use(express.json())
server.use(cors())
server.use(serverRoutes)
server.use(ExceptionMiddleware)

server.listen(server_port, () => {
    console.log(`Servidor conectado na porta: ${server_port}`)
})
