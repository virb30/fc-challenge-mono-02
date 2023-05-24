import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import ProductModel from "../repository/product.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import Product from "../domain/entity/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoiceFacade test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([InvoiceModel, ProductModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate an invoice", async () => {

        const product1 = new Product({ id: new Id("1"), name: "Item 1", price: 50 });

        await ProductModel.create({
            id: product1.id.value,
            name: product1.name,
            price: product1.price
        });

        const facade = InvoiceFacadeFactory.create();

        const input = {
            name: "Client 1",
            document: "1234567890",
            street: "Street 1",
            number: "123",
            complement: "Complement",
            city: "City 1",
            state: "State 1",
            zipCode: "12345-678",
            items: [
                { id: product1.id.value, name: product1.name, price: product1.price }
            ]
        };

        const output = await facade.generate(input);
        expect(output.id).toBeDefined();
        expect(output.total).toBe(50);
        expect(output.items).toHaveLength(1);
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.street).toBe(input.street);
        expect(output.number).toBe(input.number);
        expect(output.city).toBe(input.city);
        expect(output.complement).toBe(input.complement);
        expect(output.state).toBe(input.state);
        expect(output.zipCode).toBe(input.zipCode);
    });

    it("should find an invoice", async () => {

        const product1 = new Product({ id: new Id("1"), name: "Item 1", price: 50 });

        await ProductModel.create({
            id: product1.id.value,
            name: product1.name,
            price: product1.price
        });

        const invoiceProps = {
            id: "1",
            name: "Client 1",
            document: "1234567890",
            street: "Street 1",
            number: "123",
            complement: "Complement",
            city: "City 1",
            state: "State 1",
            zipCode: "12345-678",
            items: [
                { productId: product1.id.value, name: product1.name, price: product1.price },
            ],
            total: 50,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await InvoiceModel.create(invoiceProps, { include: ['items'] });

        const facade = InvoiceFacadeFactory.create();

        const output = await facade.find({ id: "1" });
        expect(output.id).toBeDefined();
        expect(output.total).toBe(50);
        expect(output.items).toHaveLength(1);
        expect(output.items[0].id).toBe(product1.id.value);
        expect(output.name).toBe(invoiceProps.name);
        expect(output.document).toBe(invoiceProps.document);
        expect(output.address.street).toBe(invoiceProps.street);
        expect(output.address.number).toBe(invoiceProps.number);
        expect(output.address.city).toBe(invoiceProps.city);
        expect(output.address.complement).toBe(invoiceProps.complement);
        expect(output.address.state).toBe(invoiceProps.state);
        expect(output.address.zipCode).toBe(invoiceProps.zipCode);
    });
});