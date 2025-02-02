import './paths';
import express from 'express'
import cors from 'cors'
import { serverRoutes } from '@routes/server-routes'
import { server_port } from '@configs/env'
import { ExceptionMiddleware } from '@middlewares/exception-middleware'

const server = express()

server.use(express.json())
server.use(cors())
server.use(serverRoutes)
server.use(ExceptionMiddleware)

server.listen(server_port, () => {
    console.log(`Servidor conectado na porta: ${server_port}`)
})
