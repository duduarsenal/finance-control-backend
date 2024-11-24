import { UserModel, userSchema } from "@configs/zod";
import { HttpExceptionMessage, HttpStatusCode } from "@enums";
import { UserRepository } from "@repositorys/user-repository";
import { Types } from "mongoose";
import { UserBusiness } from "@business/user-business";

const _userRepository = new UserRepository()
const _userBusiness = new UserBusiness()

export class UserService{
    async getUsers(): Promise<{status: HttpStatusCode; data: UserModel[]}>{
        try {
            var usuarios: UserModel[] =  await _userRepository.getUsers()

            return ({status: HttpStatusCode.OK, data: usuarios})
        } catch (error: any) {
            throw ({status: error?.status ?? HttpStatusCode.InternalServerError, data: error})
        }
    }

    async getUserById(id: string): Promise<{status: HttpStatusCode; data: UserModel | null}>{
        try {
            if(!Types.ObjectId.isValid(id)) throw({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.MalFormedId})

            var usuario = await _userRepository.getUserById(id)
            if(!usuario) throw ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserNotFound})

            return ({status: HttpStatusCode.OK, data: usuario})
        } catch (error: any) {
            throw ({status: error?.status ?? HttpStatusCode.InternalServerError, data: error})
        }
    }

    async addUser(user: UserModel): Promise<{status: HttpStatusCode; data: string}>{
        try {
            const canAdd = await _userBusiness.canAddUser(user)
            if(canAdd.status !== HttpStatusCode.OK){
                throw ({status: canAdd.status, message: canAdd.message})
            }

            const newUser = userSchema.parse(user)
            await _userRepository.addUser(newUser)
            
            return ({status: HttpStatusCode.Created, data: "OK"})
        } catch (error: any) {
            throw ({status: error?.status ?? HttpStatusCode.InternalServerError, data: error})
        }
    }

    async updUser(id: string, userUpdated: UserModel): Promise<{status: HttpStatusCode; data: string}>{
        try {
            const canUpd = await _userBusiness.canUpdUser(id, userUpdated)
            if(canUpd.status !== HttpStatusCode.OK){
                throw ({status: canUpd.status, message: canUpd.message})
            }

            const userToUpdate = userSchema.parse(userUpdated)
            await _userRepository.updUser(id, userToUpdate)

            return ({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw ({status: error?.status ?? HttpStatusCode.InternalServerError, data: error})
        }
    }

    async delUser(id: string): Promise<{status: HttpStatusCode; data: string}>{
        try {
            const canDel = await _userBusiness.canDelUser(id)
            if(canDel.status !== HttpStatusCode.OK){
                throw ({status: canDel.status, message: canDel.message})
            }

            await _userRepository.delUser(id)

            return ({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw ({status: error?.status ?? HttpStatusCode.InternalServerError, data: error})
        }
    }
}