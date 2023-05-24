import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../domain/entity/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productProps = {
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10
        };
        const productRepository = new ProductRepository();
        const product = new Product(productProps);
        await productRepository.add(product);
        const productDb = await ProductModel.findOne({ where: { id: productProps.id.value } })
        expect(productDb.id).toEqual(productProps.id.value);
        expect(productDb.name).toEqual(productProps.name);
        expect(productDb.description).toEqual(productProps.description);
        expect(productDb.purchasePrice).toEqual(productProps.purchasePrice);
        expect(productDb.stock).toEqual(productProps.stock);
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const createdAt = new Date();
        const updatedAt = new Date();
        ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt,
            updatedAt
        });

        const product = await productRepository.find("1");
        expect(product.id.value).toEqual("1");
        expect(product.name).toEqual("Product 1");
        expect(product.description).toEqual("Product 1 description");
        expect(product.purchasePrice).toEqual(100);
        expect(product.stock).toEqual(10);
        expect(product.createdAt).toEqual(createdAt);
        expect(product.updatedAt).toEqual(updatedAt);
    });

});