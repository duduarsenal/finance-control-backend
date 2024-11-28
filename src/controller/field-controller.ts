import { FieldService } from "@services/field-service";
import { NextFunction, Request, Response } from "express";

const _fieldService = new FieldService()

export class FieldController {

    async getFields(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const user = req.headers['user'] as string
            const {status, data} = await _fieldService.getFields(user)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error)
        }
    }

    async addField(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const field = req.body;
            const user = req.headers['user'] as string
            const {status, data} = await _fieldService.addField(field, user)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error)
        }
    }

    async updField(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const field = req.body
            const user = req.headers['user'] as string
            const {status, data} = await _fieldService.updField(field, user)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error)
        }
    }

    async updFieldDeleteParcela(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const {field_id, parcela} = req.body
            const {status, data} = await _fieldService.updFieldDeleteParcela(field_id, parcela)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error)
        }
    }

    async updFieldAlteraParcelas(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const field = req.body
            const user = req.headers['user'] as string
            const {status, data} = await _fieldService.updFieldAlteraParcelas(field, user)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error)
        }
    }

    async delField(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const {id: fieldId} = req.params
            const user = req.headers['user'] as string
            const {status, data} = await _fieldService.delField(fieldId, user)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error)
        }
    }
}