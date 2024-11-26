import { UserModel, userSchema } from "@configs/zod";
import { HttpExceptionMessage, HttpStatusCode } from "@enums";
import { UserRepository } from "@repositorys/user-repository";
import { Types } from "mongoose";
import { UserBusiness } from "@business/user-business";
import BCRYPT from 'bcrypt'
import { AppException } from "@errors";

const _userRepository = new UserRepository()
const _userBusiness = new UserBusiness()

export class UserService{
    
    async getUsers(): Promise<{status: HttpStatusCode; data: UserModel[]}>{
        try {
            var usuarios: UserModel[] =  await _userRepository.getUsers()

            return ({status: HttpStatusCode.OK, data: usuarios})
        } catch (error: any) {
            throw ({status: error?.status ?? HttpStatusCode.InternalServerError, message: error})
        }
    }

    async getUserById(id: string): Promise<{status: HttpStatusCode; data: UserModel | null}>{
        try {
            if(!Types.ObjectId.isValid(id)) throw ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.InvalidId})

            var usuario = await _userRepository.getUserById(id)
            if(!usuario) throw ({status: HttpStatusCode.BadRequest, message: HttpExceptionMessage.UserNotFound})

            return ({status: HttpStatusCode.OK, data: usuario})
        } catch (error: any) {
            throw ({status: error?.status ?? HttpStatusCode.InternalServerError, message: error})
        }
    }

    async addUser(user: UserModel): Promise<{status: HttpStatusCode; data: string}>{
        try {
            const canAdd = await _userBusiness.canAddUser(user)
            if(canAdd.status !== HttpStatusCode.OK) throw new AppException(canAdd.status, canAdd.message)

            const newUser = userSchema.parse(user)
            const hashPass = await BCRYPT.hash(newUser.senha, 12)
            newUser.senha = hashPass
            
            await _userRepository.addUser(newUser)
            
            return ({status: HttpStatusCode.Created, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async updUser(id: string, userUpdated: UserModel): Promise<{status: HttpStatusCode; data: string}>{
        try {
            const canUpd = await _userBusiness.canUpdUser(id, userUpdated)
            if(canUpd.status !== HttpStatusCode.OK){
                throw new AppException(canUpd.status, canUpd.message)
            }

            const userToUpdate = userSchema.parse(userUpdated)
            const hashPass = await BCRYPT.hash(userToUpdate.senha, 12)
            userToUpdate.senha = hashPass
            
            await _userRepository.updUser(id, userToUpdate)

            return ({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }

    async delUser(id: string): Promise<{status: HttpStatusCode; data: string}>{
        try {
            const canDel = await _userBusiness.canDelUser(id)
            if(canDel.status !== HttpStatusCode.OK){
                throw new AppException(canDel.status, canDel.message)
            }

            await _userRepository.delUser(id)

            return ({status: HttpStatusCode.OK, data: "OK"})
        } catch (error: any) {
            throw new AppException(error?.status ?? HttpStatusCode.InternalServerError, error.message)
        }
    }
}