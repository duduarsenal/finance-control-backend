import { Router } from "express";
import { userRoute } from "@routes/user-routes";
import { financeRoute } from "@routes/finance-routes";
import { authRoute } from "@routes/auth-routes";
import { AuthMiddleware } from "@middlewares/auth-middleware";

const serverRoutes = Router()

serverRoutes.use('/auth', authRoute)
serverRoutes.use("/user", userRoute)
serverRoutes.use("/finance", AuthMiddleware, financeRoute)

export { serverRoutes }