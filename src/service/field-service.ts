import { FieldBusiness } from "@business/field-business";
import { FieldModel, fieldSchema, ParcelaModel } from "@configs/zod";
import { HttpStatusCode } from "@enums";
import { AppException } from "@errors";
import { FieldRepository } from "@repositorys/field-repository";

const _fieldRepository = new FieldRepository()
const _fieldBusiness = new FieldBusiness()

export class FieldService {

    async getFields(usuario: string): Promise<{status: HttpStatusCode, data: FieldModel[]}>{
        try {
            const fields: FieldModel[] = await _fieldRepository.getFieldsByUser(usuario)

            return({status: HttpStatusCode.OK, data: fields})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async addField(field: FieldModel, usuario: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const canAdd = await _fieldBusiness.canAddField(field, usuario)
            if(canAdd.status !== HttpStatusCode.OK) throw new AppException(canAdd.status, canAdd.message)

            await _fieldRepository.addField(field, usuario)

            return({status: HttpStatusCode.Created, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async updField(field: FieldModel, usuario: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const canUpd = await _fieldBusiness.canUpdField(field, usuario)
            if(canUpd.status !== HttpStatusCode.OK) throw new AppException(canUpd.status, canUpd.message)

            await _fieldRepository.updField(field)
            field.parcelas.forEach(async (parcela) => {
                await _fieldRepository.updParcelaById(parcela)
            })

            return({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async updFieldAlteraParcelas(field: FieldModel, usuario: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const canUpd = await _fieldBusiness.canUpdField(field, usuario, true)
            if(canUpd.status !== HttpStatusCode.OK) throw new AppException(canUpd.status, canUpd.message)

            await _fieldRepository.delParcelasByIdField(field.id as string)
            await _fieldRepository.updField(field)
            await _fieldRepository.addParcelasByIdField(field.parcelas, field.id as string)

            return({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async delField(fieldId: string, usuario: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const canDel = await _fieldBusiness.canDelField(fieldId, usuario)
            if(canDel.status !== HttpStatusCode.OK) throw new AppException(canDel.status, canDel.message)

            await _fieldRepository.delParcelasByIdField(fieldId)
            await _fieldRepository.delField(fieldId)

            return({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }
}