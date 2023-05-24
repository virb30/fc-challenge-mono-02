import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export default class FindAllProductsUsecase implements UseCaseInterface {

    constructor(private productGateway: ProductGateway) { }

    async execute(): Promise<FindAllProductsDto> {
        const products = await this.productGateway.findAll()
        return {
            products: products.map((product) => ({
                id: product.id.value,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            }))
        }
    }
}