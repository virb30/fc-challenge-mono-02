import { Request, Response, Router } from "express";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";


export const invoiceRouter = Router();

invoiceRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const facade = InvoiceFacadeFactory.create();
        const output = await facade.find({
            id: req.params.id
        });
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});