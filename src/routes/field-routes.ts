import { FieldController } from "@controllers/field-controller";
import { Router } from "express";

const fieldRoute = Router()

const _fieldController = new FieldController()
fieldRoute.get("/", (req, res, next) => _fieldController.getFields(req, res, next))
fieldRoute.post("/", (req, res, next) => _fieldController.addField(req, res, next))

// Altera os campos do FIELD e dados das parcelas (valor e/ou data, NAO ALTERA QUANTIDADE DE PARCELAS)
fieldRoute.put("/", (req, res, next) => _fieldController.updField(req, res, next))

// Altera os campos do FIELD e dados das parcelas (valor e/ou data, ALTERA QUANTIDADE DE PARCELAS)
fieldRoute.put("/alterarParcelas", (req, res, next) => _fieldController.updFieldAlteraParcelas(req, res, next))

// Exclui o field e todas suas parcelas
fieldRoute.delete("/:id", (req, res, next) => _fieldController.delField(req, res, next))

export { fieldRoute }