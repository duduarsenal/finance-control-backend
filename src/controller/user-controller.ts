import { UserService } from "@services";
import { NextFunction, Request, Response } from "express";

const _userService = new UserService()

class UserController {
    
    async getUsers(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const {status, data} =  await _userService.getUsers()

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error) //Passando para o Middlware de Exceptions
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const { id } = req.params
            const {status, data} = await _userService.getUserById(id)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error) //Passando para o Middlware de Exceptions
        }
    }

    async addUser(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const newUser = req.body
            const {status, data} = await _userService.addUser(newUser)
            
            return res.status(status).json({data})
        } catch (error: any) {
            return next(error) //Passando para o Middlware de Exceptions
        }
    }

    async updUser(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            const { id } = req.params
            const user = req.body
            const { status, data } = await _userService.updUser(id, user)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error) //Passando para o Middlware de Exceptions
        }
    }

    async delUser(req: Request, res: Response, next: NextFunction): Promise<any>{
        try {
            var { id } = req.params;
            const { status, data} = await _userService.delUser(id)

            return res.status(status).json({data})
        } catch (error: any) {
            return next(error) //Passando para o Middlware de Exceptions
        }
    }
}

export { UserController };
