import { FieldModel, fieldSchema } from "@configs/zod";
import { HttpExceptionMessage, HttpStatusCode, Roles } from "@enums";
import { ZodException } from "@errors";
import { CategoriaRepository } from "@repositorys/categoria-repository";
import { FieldRepository } from "@repositorys/field-repository";
import { UserRepository } from "@repositorys/user-repository";
import { Types } from "mongoose";
import { ZodError } from "zod";

const _userRepository = new UserRepository()
const _fieldRepository = new FieldRepository()
const _categoriaRepository = new CategoriaRepository()

export class FieldBusiness {
    async canAddField(field: FieldModel, usuario: string): Promise<{status: HttpStatusCode, message: string}> {
        try {
            fieldSchema.parse(field)
            
            if(!field.categoria.id
                || !field.descricao
                || !field.tipo
                || !field.total
                || field.parcelas.length <= 0
            ) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.MissingFields})

            if(!Types.ObjectId.isValid(field.categoria.id)) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.InvalidCategoriaId})
            
            const categoriaField = await _categoriaRepository.getCategoriaById(field.categoria.id);
            if(!categoriaField) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.CategoriaNotFound})
            
            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            if(error instanceof ZodError) return new ZodException(error)
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    async canUpdField(field: FieldModel, usuario: string, alteraParcelas: boolean = false): Promise<{status: HttpStatusCode, message: string}>{
        try {
            fieldSchema.parse(field)
            if(!field.id) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.EmptyId})
            if(!Types.ObjectId.isValid(field.id)) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.InvalidFieldId})
                
            if(!field.categoria.id
                || !field.descricao
                || !field.tipo
                || !field.total
                || field.parcelas.length <= 0
            ) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.MissingFields})
            
            if(!Types.ObjectId.isValid(field.categoria.id)) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.InvalidCategoriaId})

            const userRequest = await _userRepository.getUserByUsuario(usuario)
            if(!userRequest) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserNotFound})

            const userField = await _fieldRepository.getUserByIdField(field.id)
            if(!userField) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserNotFound})

            const categoriaField = await _categoriaRepository.getCategoriaById(field.categoria.id);
            if(!categoriaField) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.CategoriaNotFound})

            if(!alteraParcelas){
                const isValidParcelas = await Promise.all(field.parcelas.map(async (parcela) => {
                    if(!parcela.id) return false
                    if(!Types.ObjectId.isValid(parcela.id)) return false
                    
                    const parcelaField = await _fieldRepository.getParcelaById(parcela.id)
                    if(!parcelaField) return false
                    
                    return true
                }))
                
                const hasErrors = isValidParcelas.some((e) => !e)
                if(hasErrors) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.ParcelaNotFound})
            }
            
            if(userRequest.role.descricao !== Roles.ADMIN
                && userRequest.role.descricao !== Roles.MODERATOR
                && userRequest.id !== userField?.user_id) {
                return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
            }
        
            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            if(error instanceof ZodError) return new ZodException(error)
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    async canDelField(fieldId: string, usuario: string): Promise<{status: HttpStatusCode, message: string}>{
        try {
            if(!fieldId) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.EmptyId})
            if(!Types.ObjectId.isValid(fieldId)) return ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.InvalidId})

            const userRequest = await _userRepository.getUserByUsuario(usuario)
            if(!userRequest) return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.UserNotFound})

            const field = await _fieldRepository.getFieldById(fieldId)
            if(!field) return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.FieldNotFound})

            if(userRequest.role.descricao !== Roles.ADMIN
                && userRequest.role.descricao !== Roles.MODERATOR
                && userRequest.id !== field?.user_id) {
                return ({status: HttpStatusCode.Unauthorized, message: HttpExceptionMessage.Unauthorized})
            }
            
            return({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }
}