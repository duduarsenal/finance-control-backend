import { Router } from "express";
import { userRoute } from "@routes/user-routes";
import { financeRoute } from "@routes/finance-routes";

const serverRoutes = Router()

serverRoutes.use("/user", userRoute)
serverRoutes.use("/finance", financeRoute)

export { serverRoutes }