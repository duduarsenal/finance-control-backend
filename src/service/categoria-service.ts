import { CategoriaRepository } from "@repositorys/categoria-repository";
import { CategoriaBusiness } from "@business/categoria-business";
import { CategoriaModel, categoriaSchema } from "@configs/zod";
import { HttpStatusCode } from "@enums";
import { AppException } from "@errors";

const _categoriaRepository = new CategoriaRepository()
const _categoriaBusiness = new CategoriaBusiness()

export class CategoriaService{
    async getCategorias(user: string): Promise<{status: HttpStatusCode, data: CategoriaModel[]}>{
        try {
            var categorias: CategoriaModel[] =  await _categoriaRepository.getCategoriasByUser(user)
            
            return ({status: HttpStatusCode.OK, data: categorias})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async addCategoria(categoria: CategoriaModel, user: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const canAdd = await _categoriaBusiness.canAddCategoria(categoria, user)
            if(canAdd.status !== HttpStatusCode.OK) throw new AppException(canAdd.status, canAdd.message)

            const newCategoria = categoriaSchema.parse(categoria)
            await _categoriaRepository.addCategoria(newCategoria, user)

            return ({status: HttpStatusCode.Created, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async delCategoria(id: string, user: string): Promise<{status: HttpStatusCode, data: string}>{
        try {
            const canDel = await _categoriaBusiness.canDelCategoria(id, user)
            if(canDel.status !== HttpStatusCode.OK) throw new AppException(canDel.status, canDel.message)

            await _categoriaRepository.delCategoria(id)

            return ({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }
}