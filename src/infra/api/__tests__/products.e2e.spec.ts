import ProductModel from "../../../modules/product-adm/repository/product.model";
import { app } from "../express";
import { addModels, sequelize } from "../../db/config";
import request from 'supertest';
import { Umzug } from "umzug";
import { migrator } from "../../db/migrator";

describe("E2E test for products", () => {

    let migration: Umzug<any>;

    beforeAll(async () => {
        await addModels();
    })

    beforeEach(async () => {
        migration = migrator(sequelize);
        await migration.up()
        await sequelize.sync();
    });

    afterAll(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize);
        await migration.down();
        await sequelize.close();
    });

    it("should create a product", async () => {
        const input = {
            name: "Product 1",
            description: "Product 1 desc",
            purchasePrice: 100,
            stock: 10
        }
        const response = await request(app)
            .post("/products")
            .send(input);

        expect(response.status).toBe(201);
        const products = await ProductModel.findAll();
        expect(products).toHaveLength(1);
        expect(products[0].name).toBe(input.name);
        expect(products[0].description).toBe(input.description);
        expect(products[0].purchasePrice).toBe(input.purchasePrice);
        expect(products[0].stock).toBe(input.stock);
    });

    it("should throw an error with invalid input", async () => {
        const response = await request(app)
            .post("/products")
            .send({});

        expect(response.status).toBe(500);
    });

});