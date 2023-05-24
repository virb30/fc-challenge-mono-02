import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUsecase implements UseCaseInterface {

    constructor(private productGateway: ProductGateway) { }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const product = await this.productGateway.find(input.id);
        return {
            id: product.id.value,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
    }

}