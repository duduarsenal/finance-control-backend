import { Router } from "express";
import { UserController } from '@controllers/user-controller'
import { AdminMiddleware, AuthMiddleware } from "@middlewares/auth-middleware";

const userRoute = Router()

const _userController = new UserController()
//Free Methods
userRoute.post("/register", (req, res, next) => _userController.addUser(req, res, next))

//Authenticated Methods
userRoute.put("/:id", AuthMiddleware, (req, res, next) => _userController.updUser(req, res, next))
userRoute.delete("/:id", AuthMiddleware, (req, res, next) => _userController.delUser(req, res, next))

//Private Methods
userRoute.get("/", AdminMiddleware, (req, res, next) => _userController.getUsers(req, res, next))
userRoute.get("/:id", AdminMiddleware, (req, res, next) => _userController.getUserById(req, res, next))

export { userRoute }