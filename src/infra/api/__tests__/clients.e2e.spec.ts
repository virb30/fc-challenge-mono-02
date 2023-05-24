import ClientModel from "../../../modules/client-adm/repository/client.model";
import { app } from "../express";
import { addModels, sequelize } from "../../db/config";
import request from 'supertest';
import { migrator } from "../../db/migrator";
import { Umzug } from "umzug";

describe("E2E test for clients", () => {

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

    it("should create a client", async () => {
        const input = {
            name: "Client 1",
            email: "client@client.com",
            document: "12345678910",
            city: "City 1",
            complement: "Complement",
            number: "1234",
            state: "State",
            street: "Street 1",
            zipCode: "12345678"
        }
        const response = await request(app)
            .post("/clients")
            .send(input);

        expect(response.status).toBe(201);
        const clients = await ClientModel.findAll();
        expect(clients).toHaveLength(1);
        expect(clients[0].name).toBe(input.name);
        expect(clients[0].email).toBe(input.email);
        expect(clients[0].document).toBe(input.document);
        expect(clients[0].street).toBe(input.street);
        expect(clients[0].city).toBe(input.city);
        expect(clients[0].state).toBe(input.state);
        expect(clients[0].zipCode).toBe(input.zipCode);
        expect(clients[0].complement).toBe(input.complement);
        expect(clients[0].number).toBe(input.number);
    });
});