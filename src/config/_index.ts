export { User as UserModel } from './zod'
export { userSchema } from './zod'

const server_port = Number(process.env.SERVER_PORT)
export { server_port }