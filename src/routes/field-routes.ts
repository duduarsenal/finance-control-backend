import { FieldController } from "@controllers/field-controller";
import { Router } from "express";

const fieldRoute = Router()

const _fieldController = new FieldController()
fieldRoute.get("/", (req, res, next) => _fieldController.getFields(req, res, next))
fieldRoute.post("/", (req, res, next) => _fieldController.addField(req, res, next))
fieldRoute.put("/", (req, res, next) => _fieldController.updField(req, res, next))
fieldRoute.put("/excluirParcela", (req, res, next) => _fieldController.updFieldDeleteParcela(req, res, next))
fieldRoute.put("/alterarParcelas", (req, res, next) => _fieldController.updFieldAlteraParcelas(req, res, next))
fieldRoute.delete("/:id", (req, res, next) => _fieldController.delField(req, res, next))

export { fieldRoute }