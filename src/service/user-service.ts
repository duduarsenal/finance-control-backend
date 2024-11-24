import { UserModel, userSchema } from "@configs";
import { HttpStatusCode } from "@enums";
import { UserRepository } from "@repositorys";
import { Types } from "mongoose";
import { UserBusiness } from "@business";

const _userRepository = new UserRepository()
const _userBusiness = new UserBusiness()

export class UserService{
    async getUsers(): Promise<{status: HttpStatusCode; message: string; data: UserModel[]}>{
        try {
            var usuarios: UserModel[] =  await _userRepository.getUsers()

            return ({status: HttpStatusCode.OK, message: "OK", data: usuarios})
        } catch (error: any) {
            console.error({message: "internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: "internal-server-error", data: []})
        }
    }

    async getUserById(id: string): Promise<{status: HttpStatusCode; message: string; data: UserModel | null}>{
        try {
            if(!Types.ObjectId.isValid(id)) {
                return {
                    status: HttpStatusCode.BadRequest,
                    message: "Formato de ID invalido",
                    data: null
                }
            }

            var usuario = await _userRepository.getUserById(id)
            if(!usuario){
                return ({status: HttpStatusCode.BadRequest, message: "usuario-nao-existe", data: null})
            }

            return ({status: HttpStatusCode.OK, message: "OK", data: usuario})
        } catch (error: any) {
            console.error({message: "internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: "internal-server-error", data: null})

        }
    }

    async addUser(user: UserModel): Promise<{status: HttpStatusCode; message: string}>{
        try {
            const canAdd = await _userBusiness.canAddUser(user)
            if(canAdd.status !== HttpStatusCode.OK){
                return ({status: canAdd.status, message: canAdd.message})
            }

            const newUser = userSchema.parse(user)
            await _userRepository.addUser(newUser)
            
            return ({status: HttpStatusCode.Created, message: "OK"})
        } catch (error: any) {
            console.error({message: "service-internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    async updUser(id: string, userUpdated: UserModel): Promise<{status: HttpStatusCode; message: string}>{
        try {
            const canUpd = await _userBusiness.canUpdUser(id, userUpdated)
            if(canUpd.status !== HttpStatusCode.OK){
                return ({status: canUpd.status, message: canUpd.message})
            }

            const userToUpdate = userSchema.parse(userUpdated)
            await _userRepository.updUser(id, userToUpdate)

            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            console.error({message: "internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }

    async delUser(id: string): Promise<{status: HttpStatusCode; message: string}>{
        try {
            const canDel = await _userBusiness.canDelUser(id)
            if(canDel.status !== HttpStatusCode.OK){
                return ({status: canDel.status, message: canDel.message})
            }

            _userRepository.delUser(id)
            return ({status: HttpStatusCode.OK, message: "OK"})
        } catch (error: any) {
            console.error({message: "internal-server-error", error})
            return ({status: HttpStatusCode.InternalServerError, message: error.message})
        }
    }
}