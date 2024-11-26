import { HttpStatusCode } from "@enums";
import { NextFunction, Request, Response } from "express";

export function ExceptionMiddleware(error: any, req: Request, res: Response, next: NextFunction): void{
    const status = error?.status || HttpStatusCode.InternalServerError
    const data = error?.message?.message || error?.message || "internal-server-error - check logs or call developer for more information"

    // console.error(`[Error]: ${data}`, { error })
    res.status(status).json({data})
}