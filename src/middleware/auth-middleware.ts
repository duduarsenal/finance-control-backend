import { HttpExceptionMessage, HttpStatusCode } from "@enums";
import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken'
import { jwt_key } from '@configs/env'
import { UserModel } from "@configs/zod";
import { UserRepository } from "@repositorys/user-repository";

const _userRepository = new UserRepository();

export function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const { authorization } = req.headers

        if(!authorization || !authorization.includes("Bearer")) {
            throw ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
        }

        const token = authorization.split("Bearer ")[1]
        const isValidToken = JWT.verify(token, jwt_key)
        if (!isValidToken) throw ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
        
        const tokenDecoded = JWT.decode(token, { json: true })
        const userInfo: UserModel = tokenDecoded?.data
        if(!userInfo) throw ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})

        const isAtivoUser = _userRepository.getUserById(userInfo.id as string)
        if(!isAtivoUser) throw ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})

        req.headers['user'] = userInfo.usuario
        next();
    } catch (error: any) {
        console.error('Erro ao validar token', {message: error.message})
        throw ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
    }
}

export function AdminMiddleware(req: Request, res: Response, next: NextFunction){
    
}