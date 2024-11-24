import { HttpStatusCode } from "@enums";
import { NextFunction, Request, Response } from "express";

export function ExceptionMiddleware(error: any, req: Request, res: Response, next: NextFunction): void{
    const status = error?.status || HttpStatusCode.InternalServerError
    const data = error?.data?.message || "internal-server-error"

    console.error(`[Error]: ${data}`, { error })
    res.status(status).json({data})
}