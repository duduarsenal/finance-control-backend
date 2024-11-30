import { CategoriaRepository } from "@repositorys/categoria-repository";
import { UserRepository } from "@repositorys/user-repository";
import { CategoriaModel, categoriaSchema } from "@configs/zod";
import { HttpExceptionMessage, HttpStatusCode, Roles } from "@enums";
import { ZodError } from "zod";
import { ZodException } from "@errors";
import { Types } from "mongoose";

const _categoriaRepository = new CategoriaRepository()
const _userRepository = new UserRepository()

export class CategoriaBusiness{
    
    public async canAddCategoria(categoria: CategoriaModel, userReq: string): Promise<{status: HttpStatusCode, message: string}>{
        try {
            categoriaSchema.parse(categoria)
            
            const categoriaByDesc = await _categoriaRepository.getCategoriaByDescricaoUser(categoria.descricao, userReq)
            if(categoriaByDesc) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.CategoriaAlreadyExists})
            if(!categoria.descricao 
                || !categoria.cor 
                || !categoria.emoji
            ) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.MissingFields})
            
            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            if(error instanceof ZodError) return new ZodException(error)
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    public async canUpdCategoria(id: string, categoria: CategoriaModel, usuario: string): Promise<{status: HttpStatusCode, message: string}>{
        try {
            categoriaSchema.parse(categoria)
            if(!id) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.EmptyId})
            if(!Types.ObjectId.isValid(id)) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.InvalidId})

            const categoriaExists = await _categoriaRepository.getCategoriaById(id)
            if(!categoriaExists) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.CategoriaNotFound})

            const userRequest = await _userRepository.getUserByUsuario(usuario)
            if(!userRequest) return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})

            if(userRequest.role.descricao !== Roles.ADMIN
                && userRequest.role.descricao !== Roles.MODERATOR
                && userRequest.id !== categoriaExists.user_id) {
                return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
            }
            
            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            if(error instanceof ZodError) return new ZodException(error)
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    public async canDelCategoria(id: string, userReq: string): Promise<{status: HttpStatusCode, message: string}>{
        try {
            if(!id) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.EmptyId})
            if(!Types.ObjectId.isValid(id)) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.InvalidId})
            
            const categoria = await _categoriaRepository.getCategoriaById(id)
            if(!categoria) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.CategoriaNotFound})

            const userRequest = await _userRepository.getUserByUsuario(userReq)
            if(!userRequest) return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
            
            if(userRequest.role.descricao !== Roles.ADMIN
                && userRequest.role.descricao !== Roles.MODERATOR
                && userRequest.id !== categoria.user_id) {
                return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
            }

            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }
}