import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.dto";

export class FindClientUsecase implements UseCaseInterface {

    constructor(private clientRepository: ClientGateway) { }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const client = await this.clientRepository.find(input.id);
        return {
            id: client.id.value,
            name: client.name,
            email: client.email,
            document: client.document,
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