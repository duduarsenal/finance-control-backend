import { Router } from "express";
import { UserController } from '@controllers'


const userRoute = Router()

const _userController = new UserController()
userRoute.get("/", (req, res, next) => _userController.getUsers(req, res, next))
userRoute.get("/:id", (req, res, next) => _userController.getUserById(req, res, next))
userRoute.post("/", (req, res, next) => _userController.addUser(req, res, next))
userRoute.put("/", (req, res, next) => _userController.updUser(req, res, next))
userRoute.delete("/:id", (req, res, next) => _userController.delUser(req, res, next))

export { userRoute }