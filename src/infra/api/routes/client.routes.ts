import { Request, Response, Router } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";

export const clientRouter = Router();

clientRouter.post("/", async (req: Request, res: Response) => {
    try {
        const facade = ClientAdmFacadeFactory.create()
        const clientDto = {
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            city: req.body.city,
            complement: req.body.complement,
            number: req.body.number,
            state: req.body.state,
            street: req.body.street,
            zipCode: req.body.zipCode
        }
        await facade.add(clientDto)
        res.status(201).send();
    } catch (err) {
        res.status(500).send(err);
    }
});