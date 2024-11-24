import { UserModel, userSchema } from "@configs/zod";
import { HttpExceptionMessage, HttpStatusCode } from "@enums";
import { UserRepository } from "@repositorys/user-repository";
import { Types } from "mongoose";
import { ZodError } from "zod";

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
            if(error instanceof ZodError) {
                console.error({message: "type-error", error: error.issues.flatMap((e) => e.message).join(", ")})
                return ({status: HttpStatusCode.BadRequest, message: error.issues.flatMap((e) => e.message).join(", ")})
            }

            console.error({message: "business-internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    public async canUpdUser(id: string, {nome, senha, usuario}: UserModel): Promise<{status: HttpStatusCode, message: string}> {
        try {
            userSchema.parse({nome, senha, usuario})
            if(!id) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.EmptyId})

            const user = await _userRepository.getUserById(id)
            if(!user) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserNotFound})
            if(user.usuario !== usuario) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UsernameChanged})
            if(!usuario || !senha) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.MissingFields})
             
            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            if(error instanceof ZodError) {
                console.error({message: "type-error", error: error.issues.flatMap((e) => e.message).join(", ")})
                return ({status: HttpStatusCode.BadRequest, message: error.issues.flatMap((e) => e.message).join(", ")})
            }

            console.error({message: "business-internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    public async canDelUser(id: string): Promise<{status: HttpStatusCode, message: string}>{
        try {
            if(!id) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.EmptyId})
            if(!Types.ObjectId.isValid(id)) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.MalFormedId})

            const user = await _userRepository.getUserById(id)
            if(!user) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserNotFound})

            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            console.error({message: "business-internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }
}