import StoreCatalogFacade from "../facade/store-catalog.facade";
import StoreCatalogFacadeInterface from "../facade/store-catalog.facade.interface";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacadeInterface {
        const productRepository = new ProductRepository();
        const findProductUsecase = new FindProductUsecase(productRepository);
        const findAllProductsUsecase = new FindAllProductsUsecase(productRepository);
        const facade = new StoreCatalogFacade({
            findUsecase: findProductUsecase,
            findAllUsecase: findAllProductsUsecase
        });
        return facade;
    }
}