import { Request, Response, Router } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export const productRouter = Router();

productRouter.post("/", async (req: Request, res: Response) => {
    try {
        const facade = ProductAdmFacadeFactory.create();
        const productDto = {
            name: req.body.name,
            description: req.body.description,
            purchasePrice: parseFloat(req.body.purchasePrice),
            stock: parseInt(req.body.stock)
        }
        await facade.addProduct(productDto);
        res.status(201).send();
    } catch (err) {
        res.status(500).send(err);
    }
});