import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/entity/product.entity";
import CheckStockUsecase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product",
    description: "Product description",
    purchasePrice: 100,
    stock: 10
})


const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe("CheckStock usecase unit test", () => {

    it("should get stock of a product", async () => {
        const productRepository = MockRepository()
        const checkStockUsecase = new CheckStockUsecase(productRepository);
        const input = {
            productId: "1",
        }
        const output = await checkStockUsecase.execute(input);
        expect(productRepository.find).toHaveBeenCalled();
        expect(output.productId).toBe(product.id.value);
        expect(output.stock).toBe(product.stock);
    });

})