import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUsecase implements UseCaseInterface {

    constructor(private productRepository: ProductGateway) { }

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this.productRepository.find(input.productId);
        return {
            productId: product.id.value,
            stock: product.stock
        }
    }
}