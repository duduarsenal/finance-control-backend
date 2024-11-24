import { HttpStatusCode } from '@enums';
import { UserService } from "@services";
import { Request, Response } from "express";
import { Types } from "mongoose";

const _userService = new UserService()

class UserController {
    
    async getUsers(req: Request, res: Response): Promise<any>{
        try {
            const {status, message, data} =  await _userService.getUsers()

            return res.status(status).json({message, data})
        } catch (error: any) {
            console.error({message: "internal-server-error", error})
            return res.status(HttpStatusCode.InternalServerError).json({message: "internal-server-error", error})
        }
    }

    async getUserById(req: Request, res: Response): Promise<any>{
        try {
            const { id } = req.params
            const {status, message, data} = await _userService.getUserById(id)

            return res.status(status).json({message, data})
        } catch (error: any) {
            console.error({message: "internal-server-error", error})
            return res.status(HttpStatusCode.InternalServerError).json({message: "internal-server-error", error})
        }
    }

    async addUser(req: Request, res: Response): Promise<any>{
        try {
            const newUser = req.body
            const {status, message} = await _userService.addUser(newUser)
            
            return res.status(status).json({message})
        } catch (error: any) {
            console.error({message: "internal-server-error", error})
            return res.status(HttpStatusCode.InternalServerError).json({message: "internal-server-error", error})
        }
    }

    async updUser(req: Request, res: Response): Promise<any>{
        try {
            const { id } = req.params
            const user = req.body
            const { status, message } = await _userService.updUser(id, user)

            return res.status(status).json({message})
        } catch (error: any) {
            console.error({message: "internal-server-error", error})
            return res.status(HttpStatusCode.InternalServerError).json({message: "internal-server-error", error})
        }
    }

    async delUser(req: Request, res: Response): Promise<any>{
        try {
            var { id } = req.params;

            await _userService.delUser(id)
            return res.status(HttpStatusCode.OK).json({message: "OK"})
        } catch (error: any) {
            console.error({message: "internal-server-error", error})
            return res.status(HttpStatusCode.InternalServerError).json({message: "internal-server-error", error})
        }
    }
}

export { UserController };
