import { Router } from "express";
import { UserController } from '@controllers'


const userRoute = Router()

const _userController = new UserController()
userRoute.get("/", (req, res) => _userController.getUsers(req, res))
userRoute.get("/:id", (req, res) => _userController.getUserById(req, res))
userRoute.post("/", (req, res) => _userController.addUser(req, res))
userRoute.put("/", (req, res) => _userController.updUser(req, res))
userRoute.delete("/:id", (req, res) => _userController.delUser(req, res))

export { userRoute }