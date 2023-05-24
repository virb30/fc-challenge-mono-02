import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCaseProps {
    findUsecase: FindProductUsecase,
    findAllUsecase: FindAllProductsUsecase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findUsecase: FindProductUsecase;
    private _findAllUsecase: FindAllProductsUsecase;

    constructor(props: UseCaseProps) {
        this._findUsecase = props.findUsecase;
        this._findAllUsecase = props.findAllUsecase;
    }

    async find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return this._findUsecase.execute(input)
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return this._findAllUsecase.execute();
    }

}