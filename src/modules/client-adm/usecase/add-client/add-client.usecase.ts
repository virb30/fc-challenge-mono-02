import { ImportsNotUsedAsValues } from "typescript";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.dto";
import Client from "../../domain/client.entity";
import Address from "../../../@shared/domain/value-object/address.value-object";

export default class AddClientUsecase implements UseCaseInterface {
    constructor(private clientRepository: ClientGateway) { }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            email: input.email,
            document: input.document,
            address: new Address({
                street: input.street,
                state: input.state,
                city: input.city,
                complement: input.complement,
                zipCode: input.zipCode,
                number: input.number
            })
        };
        const client = new Client(props);
        this.clientRepository.add(client);
        return {
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
            updatedAt: client.updatedAt,
        }
    }
}
