import { UserModel, userSchema } from "@configs/zod";
import { HttpExceptionMessage, HttpStatusCode, Roles } from "@enums";
import { UserRepository } from "@repositorys/user-repository";
import { Types } from "mongoose";
import { ZodError } from "zod";
import { ZodException } from "@errors";

const _userRepository = new UserRepository()

export class UserBusiness{
    
    public async canAddUser({id, nome, senha, usuario}: UserModel): Promise<{status: HttpStatusCode, message: string}>{
        try {
            userSchema.parse({id, nome, senha, usuario})
            if(id) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.IdNotAllowed})

            const userByUsuario = await _userRepository.getUserByUsuario(usuario)
            if(userByUsuario) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserAlreadyExists})
            if(!nome || !senha) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.MissingFields})
            
            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            if(error instanceof ZodError) return new ZodException(error)
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    public async canUpdUser(id: string, {nome, senha, usuario}: UserModel, userReq: string): Promise<{status: HttpStatusCode, message: string}> {
        try {
            userSchema.parse({nome, senha, usuario})
            if(!id) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.EmptyId})
            if(!Types.ObjectId.isValid(id)) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.InvalidId})

            const user = await _userRepository.getUserById(id)
            if(!user) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserNotFound})

            const userRequest = await _userRepository.getUserByUsuario(userReq)
            if(!userRequest) return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
            if(userRequest.role.descricao !== Roles.ADMIN
                && userRequest.role.descricao !== Roles.MODERATOR
                && userRequest.usuario !== user.usuario) {
                return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
            }

            if(user.usuario !== usuario) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UsernameChanged})
            if(!usuario || !senha) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.MissingFields})
             
            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            if(error instanceof ZodError) return new ZodException(error)
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    public async canDelUser(id: string, userReq: string): Promise<{status: HttpStatusCode, message: string}>{
        try {
            if(!id) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.EmptyId})
            if(!Types.ObjectId.isValid(id)) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.InvalidId})
            
            const user = await _userRepository.getUserById(id)
            if(!user) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserNotFound})

            const userRequest = await _userRepository.getUserByUsuario(userReq)
            if(!userRequest) return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
            
            if(userRequest.role.descricao !== Roles.ADMIN
                && userRequest.usuario !== user.usuario) {
                return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
            }

            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }
}