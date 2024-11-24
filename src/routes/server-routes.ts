import { Router } from "express";
import { userRoute } from "./user-routes";
import { financeRoute } from "./finance-routes";

const serverRoutes = Router()

serverRoutes.use("/user", userRoute)
serverRoutes.use("/finance", financeRoute)

export { serverRoutes }