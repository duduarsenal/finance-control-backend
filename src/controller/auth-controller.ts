import { HttpExceptionMessage, HttpStatusCode } from "@enums";
import { AuthService } from "@services/auth-service";
import { NextFunction, Request, Response } from "express";

const _authService = new AuthService()

export class AuthController{
    async session(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const userInfo = req.body;
            const { status, data } = await _authService.session(userInfo)

            return res.status(status).json({data})
        } catch (error: any) {
            next(error)
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction){
        try {
            const user = req.headers['user'];
            const { status, data } = await _authService.refreshToken(user as string)

            return res.status(status).json({data})
        } catch (error: any) {
            next(error)
        }
    }
    
}