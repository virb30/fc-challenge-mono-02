import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import ProductModel from "./product.model";
import Product from "../domain/entity/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {

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

    it("should save an invoice", async () => {

        const invoiceRepository = new InvoiceRepository();

        const address = new Address({
            street: "Street 1",
            number: "123",
            complement: "Complement",
            city: "City 1",
            state: "State 1",
            zipCode: "12345-678",
        });

        const product1 = new Product({ id: new Id("1"), name: "Item 1", price: 50 });
        const product2 = new Product({ id: new Id("2"), name: "Item 2", price: 50 });
        const product3 = new Product({ id: new Id("3"), name: "Item 3", price: 50 });

        await ProductModel.create({
            id: product1.id.value,
            name: product1.name,
            price: product1.price
        });

        await ProductModel.create({
            id: product2.id.value,
            name: product2.name,
            price: product2.price
        });

        await ProductModel.create({
            id: product3.id.value,
            name: product3.name,
            price: product3.price
        });

        const invoice = new Invoice({
            id: new Id("1"),
            name: "Client 1",
            document: "1234567890",
            address,
            items: [product1, product2, product3]
        });

        await invoiceRepository.save(invoice);

        const persistedInvoice = await InvoiceModel.findOne({
            where: { id: "1" },
            include: 'items'
        });

        expect(persistedInvoice.id).toBe("1");
        expect(persistedInvoice.name).toBe(invoice.name);
        expect(persistedInvoice.document).toBe(invoice.document);
        expect(persistedInvoice.street).toBe(invoice.address.street);
        expect(persistedInvoice.city).toBe(invoice.address.city);
        expect(persistedInvoice.number).toBe(invoice.address.number);
        expect(persistedInvoice.complement).toBe(invoice.address.complement);
        expect(persistedInvoice.state).toBe(invoice.address.state);
        expect(persistedInvoice.zipCode).toBe(invoice.address.zipCode);
        expect(persistedInvoice.items).toHaveLength(3);
        expect(persistedInvoice.items[0].productId).toBe(product1.id.value);
        expect(persistedInvoice.items[1].productId).toBe(product2.id.value);
        expect(persistedInvoice.items[2].productId).toBe(product3.id.value);
        expect(persistedInvoice.total).toBe(150);
    });

    it("should find an invoice", async () => {

        const invoiceRepository = new InvoiceRepository();

        const product1 = new Product({ id: new Id("1"), name: "Item 1", price: 50 });
        const product2 = new Product({ id: new Id("2"), name: "Item 2", price: 50 });
        const product3 = new Product({ id: new Id("3"), name: "Item 3", price: 50 });

        await ProductModel.create({
            id: product1.id.value,
            name: product1.name,
            price: product1.price
        });

        await ProductModel.create({
            id: product2.id.value,
            name: product2.name,
            price: product2.price
        });

        await ProductModel.create({
            id: product3.id.value,
            name: product3.name,
            price: product3.price
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
                { productId: product2.id.value, name: product2.name, price: product2.price },
                { productId: product3.id.value, name: product3.name, price: product3.price },
            ],
            total: 150,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await InvoiceModel.create(invoiceProps, { include: ['items'] });

        const invoice = await invoiceRepository.find("1");

        expect(invoice.id.value).toBe(invoiceProps.id);
        expect(invoice.name).toBe(invoiceProps.name);
        expect(invoice.document).toBe(invoiceProps.document);
        expect(invoice.address.street).toBe(invoiceProps.street);
        expect(invoice.address.city).toBe(invoiceProps.city);
        expect(invoice.address.number).toBe(invoiceProps.number);
        expect(invoice.address.complement).toBe(invoiceProps.complement);
        expect(invoice.address.state).toBe(invoiceProps.state);
        expect(invoice.address.zipCode).toBe(invoiceProps.zipCode);
        expect(invoice.items).toHaveLength(3);
        expect(invoice.items[0].id.value).toBe(product1.id.value);
        expect(invoice.items[1].id.value).toBe(product2.id.value);
        expect(invoice.items[2].id.value).toBe(product3.id.value);
        expect(invoice.total).toBe(150);
    });
});