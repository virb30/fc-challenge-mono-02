import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            document: client.document,
            email: client.email,
            street: client.address.street,
            state: client.address.state,
            city: client.address.city,
            number: client.address.number,
            zipCode: client.address.zipCode,
            complement: client.address.complement,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        })
    }

    async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({ where: { id } });
        if (!client) {
            throw new Error("client not found");
        }
        return new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address({
                street: client.street,
                state: client.state,
                city: client.city,
                number: client.number,
                zipCode: client.zipCode,
                complement: client.complement,
            }),
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    }

}