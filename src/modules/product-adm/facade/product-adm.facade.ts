import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCasesProps {
    addProductUsecase: UseCaseInterface;
    checkStockUsecase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addProductUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;

    constructor(usecasesProps: UseCasesProps) {
        this._addProductUsecase = usecasesProps.addProductUsecase;
        this._checkStockUsecase = usecasesProps.checkStockUsecase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addProductUsecase.execute(input);
    }


    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }

}