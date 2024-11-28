import { CategoriaService } from "@services/categoria-service"
import { NextFunction, Request, Response } from "express"

const _categoriaService = new CategoriaService()

export class CategoriaController {
    async getCategorias(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const user = req.headers['user'] as string
            const {status, data} =  await _categoriaService.getCategorias(user)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error)
        }
    }

    async addCategoria(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const newCategoria = req.body
            const user = req.headers['user'] as string
            const {status, data} =  await _categoriaService.addCategoria(newCategoria, user)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error)
        }
    }

    async delCategoria(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const { id } = req.params;
            const userReq = req.headers['user'] as string
            const {status, data} =  await _categoriaService.delCategoria(id, userReq)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error)
        }
    }
}