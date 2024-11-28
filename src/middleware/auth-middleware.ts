import { UserRepository } from "@repositorys/user-repository";
import { UserModel } from "@configs/zod";
import { jwt_key } from '@configs/env'
import { HttpExceptionMessage, HttpStatusCode, Roles } from "@enums";
import { NextFunction, Request, Response } from "express";
import JWT, { JsonWebTokenError } from 'jsonwebtoken'
import { AppException } from "@errors";

const _userRepository = new UserRepository();

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const { authorization } = req.headers

        if(!authorization || !authorization.includes("Bearer")) {
            throw new AppException(HttpStatusCode.Unauthorized, HttpExceptionMessage.MissingToken)
        }

        const token = authorization.split("Bearer ")[1]
        if(!token) throw new AppException(HttpStatusCode.Unauthorized, HttpExceptionMessage.MissingToken)

        const tokenDecoded = JWT.verify(token, jwt_key) as { data: UserModel }

        const userInfo: UserModel = tokenDecoded?.data
        if(!userInfo) throw new AppException(HttpStatusCode.Unauthorized, HttpExceptionMessage.CantParseToken)

        const isAtivoUser = await _userRepository.getUserById(userInfo.id as string)
        if(!isAtivoUser) throw new AppException(HttpStatusCode.Unauthorized, HttpExceptionMessage.UserNotFound)

        req.headers['user'] = userInfo.usuario
        next();
    } catch (error: any) {
        if(error instanceof JsonWebTokenError) {
            next({...error, status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.CantParseToken})
        }
        next(error)
    }
}

export async function AdminMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        const { authorization } = req.headers

        if(!authorization || !authorization.includes("Bearer")) {
            throw new AppException(HttpStatusCode.Unauthorized, HttpExceptionMessage.MissingToken)
        }

        const token = authorization.split("Bearer ")[1]
        if(!token) throw new AppException(HttpStatusCode.Unauthorized, HttpExceptionMessage.MissingToken)

        const tokenDecoded = JWT.verify(token, jwt_key) as { data: UserModel }

        const userInfo: UserModel = tokenDecoded?.data
        if(!userInfo) throw new AppException(HttpStatusCode.Unauthorized, HttpExceptionMessage.CantParseToken)

        const isAtivoUser = await _userRepository.getUserById(userInfo.id as string)
        if(!isAtivoUser) throw new AppException(HttpStatusCode.Unauthorized, HttpExceptionMessage.UserNotFound)

        if(isAtivoUser.role.descricao !== Roles.ADMIN && isAtivoUser.role.descricao !== Roles.MODERATOR) {
            throw new AppException(HttpStatusCode.Unauthorized, HttpExceptionMessage.Unauthorized)
        }

        req.headers['user'] = userInfo.usuario
        next();
    } catch (error: any) {
        if(error instanceof JsonWebTokenError) {
            next({...error, status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.CantParseToken})
        }
        next(error)
    }
}