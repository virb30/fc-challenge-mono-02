import ClientModel from "../../../modules/client-adm/repository/client.model";
import { app } from "../express";
import { addModels, sequelize } from "../../db/config";
import request from 'supertest';
import { migrator } from "../../db/migrator";
import { Umzug } from "umzug";
import { QueryTypes } from "sequelize";

describe("Invoice E2E test", () => {
    let migration: Umzug<any>;

    beforeAll(async () => {
        await addModels();
    });

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

    it("should get invoice", async () => {
        await sequelize.query(`INSERT INTO products (id, name, description, salesPrice, stock, createdAt, updatedAt) 
            VALUES (:id, :name, :description, :salesPrice, :stock, :createdAt, :updatedAt);`,
            {
                replacements: {
                    id: "1",
                    name: "Product 1",
                    description: "Product 1 desc",
                    salesPrice: 150,
                    stock: 10,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                type: QueryTypes.INSERT
            }
        );

        await sequelize.query(`INSERT INTO products (id, name, description, salesPrice, stock, createdAt, updatedAt) 
            VALUES (:id, :name, :description, :salesPrice, :stock, :createdAt, :updatedAt);`,
            {
                replacements: {
                    id: "2",
                    name: "Product 2",
                    description: "Product 2 desc",
                    salesPrice: 100,
                    stock: 10,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                type: QueryTypes.INSERT
            }
        );

        const clientInput = {
            id: "1",
            name: "Client 1",
            email: "client@client.com",
            document: "12345678910",
            city: "City 1",
            complement: "Complement",
            number: "1234",
            state: "State",
            street: "Street 1",
            zipCode: "12345678",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await ClientModel.create(clientInput);

        const input = {
            clientId: "1",
            products: [
                { productId: "1" },
                { productId: "2" },
            ]
        }

        const placeOrderResponse = await request(app)
            .post("/checkout")
            .send(input);
        const order = placeOrderResponse.body;


        const response = await request(app)
            .get(`/invoice/${order.invoiceId}`)
            .send();

        expect(response.status).toBe(200);
    });
});