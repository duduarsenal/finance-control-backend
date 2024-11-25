import { AuthModel, authSchema, UserModel } from "@configs/zod";
import { HttpExceptionMessage, HttpStatusCode } from "@enums";
import { UserRepository } from "@repositorys/user-repository";
import BCRYPT from 'bcrypt'
import JWT from 'jsonwebtoken'
import { jwt_key } from "@configs/env";
import { ZodError } from "zod";
import { ZodException } from "../utils/error";

const _userRepository = new UserRepository()

export class AuthService{
    
    async session(auth: AuthModel): Promise<{status: HttpStatusCode, data: string}>{
        try {
            authSchema.parse(auth)
            const user =  await _userRepository.getUserByUsuario(auth.usuario)
            if(!user) throw ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserNotFound})

            const isValidPassword = await BCRYPT.compare(auth.senha, user.senha)
            if(!isValidPassword) throw ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})

            const userToken = await this.getToken(user)

            return ({status: HttpStatusCode.OK, data: userToken})
        } catch (error: any) {
            if(error instanceof ZodError) {
                throw new ZodException(error).toResponse()
            }

            throw ({status: error?.status ?? HttpStatusCode.InternalServerError, message: error})
        }
    }

    async refreshToken(usuario: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const user =  await _userRepository.getUserByUsuario(usuario)
            if(!user) throw ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserNotFound})

            const newToken = await this.getToken(user)
            
            return {status: HttpStatusCode.OK, data: newToken}
        } catch (error: any) {
            throw ({status: error?.status ?? HttpStatusCode.InternalServerError, message: error})
        }
    }

    private async getToken(user: UserModel): Promise<string>{
        const token = JWT.sign({
            data: {
                id: user.id,
                nome: user.nome,
                usuario: user.usuario,
            }
        }, jwt_key, { expiresIn: '12h' })

        return token
    }
}