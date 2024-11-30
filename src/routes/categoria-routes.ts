import { CategoriaController } from "@controllers/categoria-controller";
import { Router } from "express";

const categoriaRoute = Router()

const _categoriaController = new CategoriaController()
categoriaRoute.get("/", (req, res, next) => _categoriaController.getCategorias(req, res, next))
categoriaRoute.post("/", (req, res, next) => _categoriaController.addCategoria(req, res, next))
categoriaRoute.put("/:id", (req, res, next) => _categoriaController.updCategoria(req, res, next))
categoriaRoute.delete("/:id", (req, res, next) => _categoriaController.delCategoria(req, res, next))

export { categoriaRoute }