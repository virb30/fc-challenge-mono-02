import { Request, Response, Router } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import PlaceOrderUsecase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";

export const checkoutRouter = Router();

checkoutRouter.post("/", async (req: Request, res: Response) => {
    try {
        const clientFacade = ClientAdmFacadeFactory.create();
        const productFacade = ProductAdmFacadeFactory.create();
        const catalogFacade = StoreCatalogFacadeFactory.create();
        const paymentFacade = PaymentFacadeFactory.create();
        const invoiceFacade = InvoiceFacadeFactory.create();
        const orderRepository = {
            addOrder: jest.fn(),
            findOrder: jest.fn()
        }

        const usecase = new PlaceOrderUsecase(
            clientFacade,
            productFacade,
            catalogFacade,
            paymentFacade,
            invoiceFacade,
            orderRepository
        );
        const orderDto = {
            clientId: req.body.clientId,
            products: req.body.products
        }
        const order = await usecase.execute(orderDto);
        res.status(201).send(order);
    } catch (err) {
        res.status(500).send(err);
    }
});