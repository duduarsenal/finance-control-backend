import { Router } from "express";
import { authRoute } from "@routes/auth-routes";
import { userRoute } from "@routes/user-routes";
import { categoriaRoute } from "@routes/categoria-routes";
import { fieldRoute } from "@routes/field-routes";
import { AuthMiddleware } from "@middlewares/auth-middleware";
import { errorRoute } from "./error-route";

const serverRoutes = Router()

serverRoutes.use('/auth', authRoute)
serverRoutes.use("/user", userRoute)
serverRoutes.use("/categoria", AuthMiddleware, categoriaRoute)
serverRoutes.use("/field", AuthMiddleware, fieldRoute)

serverRoutes.use("*", errorRoute) //Rota inexistente das listadas acima

export { serverRoutes }