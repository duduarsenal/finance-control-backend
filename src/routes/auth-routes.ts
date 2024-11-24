import { Router } from "express";
import { AuthController } from '@controllers/auth-controller'
import { AuthMiddleware } from "@middlewares/auth-middleware";

const authRoute = Router()

const _authController = new AuthController()
// FreeMethod
authRoute.post('/session', (req, res, next) => _authController.session(req, res, next))

// AuthenticatedMethod
authRoute.post('/refresh', AuthMiddleware, (req, res, next) => _authController.refreshToken(req, res, next))

export { authRoute }