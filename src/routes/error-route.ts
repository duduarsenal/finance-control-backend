import { HttpExceptionMessage, HttpStatusCode } from "@enums";
import { Request, Response, Router } from "express";

const errorRoute = Router()

errorRoute.get("*", (req, res) => errorRouteResponse(req, res))
errorRoute.post("*", (req, res) => errorRouteResponse(req, res))
errorRoute.put("*", (req, res) => errorRouteResponse(req, res))
errorRoute.delete("*", (req, res) => errorRouteResponse(req, res))

function errorRouteResponse(req: Request, res: Response){
    res.status(HttpStatusCode.NotFound).json({data: HttpExceptionMessage.RouteNotFound})
    return
}

export { errorRoute }