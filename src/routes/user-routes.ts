import { Router } from "express";
import { UserController } from '@controllers/user-controller'
import { AdminMiddleware, AuthMiddleware } from "@middlewares/auth-middleware";

const userRoute = Router()

const _userController = new UserController()
//Free Methods
userRoute.post("/", (req, res, next) => _userController.addUser(req, res, next))

//Authenticated Methods
// userRoute.put("/:id", AuthMiddleware, (req, res, next) => _userController.updUser(req, res, next))
// userRoute.delete("/:id", AuthMiddleware, (req, res, next) => _userController.delUser(req, res, next))
userRoute.put("/:id", (req, res, next) => _userController.updUser(req, res, next))
userRoute.delete("/:id", (req, res, next) => _userController.delUser(req, res, next))

//Private Methods
// userRoute.get("/", AuthMiddleware, AdminMiddleware, (req, res, next) => _userController.getUsers(req, res, next))
// userRoute.get("/:id", AuthMiddleware, AdminMiddleware, (req, res, next) => _userController.getUserById(req, res, next))
userRoute.get("/", (req, res, next) => _userController.getUsers(req, res, next))
userRoute.get("/:id", (req, res, next) => _userController.getUserById(req, res, next))

export { userRoute }