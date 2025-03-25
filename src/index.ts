import './paths';
import express from 'express'
import cors from 'cors'
import { serverRoutes } from '@routes/server-routes'
import { server_port } from '@configs/env'
import { ExceptionMiddleware } from '@middlewares/exception-middleware'
import { errorRoute } from '@routes/error-route';

const server = express()

server.use(express.json())
server.use(cors())
server.use('/api/v1', serverRoutes) //Rotas do sistema
server.use('*', errorRoute) //Rota inexistente (fora do padrao /api/versão)
server.use(ExceptionMiddleware)

server.listen(server_port, () => {
    console.log(`Servidor conectado na porta: ${server_port}`)
})
