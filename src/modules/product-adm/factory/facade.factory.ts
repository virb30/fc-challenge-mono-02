import ProductAdmFacade from "../facade/product-adm.facade";
import ProductAdmFacadeInterface from "../facade/product-adm.facade.interface";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUsecase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
    static create(): ProductAdmFacadeInterface {
        const productRepository = new ProductRepository();
        const addProductUsecase = new AddProductUseCase(productRepository);
        const checkStockUsecase = new CheckStockUsecase(productRepository);
        const productFacade = new ProductAdmFacade({
            addProductUsecase,
            checkStockUsecase
        });
        return productFacade;
    }
}