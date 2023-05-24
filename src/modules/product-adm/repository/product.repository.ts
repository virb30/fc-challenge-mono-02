import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/entity/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {

    async find(id: string): Promise<Product> {
        const productData = await ProductModel.findOne({ where: { id } });
        if (!productData) {
            throw new Error(`Product with id ${id} not found`);
        }
        return new Product({
            id: new Id(productData.id),
            name: productData.name,
            description: productData.description,
            purchasePrice: productData.purchasePrice,
            stock: productData.stock,
            createdAt: productData.createdAt,
            updatedAt: productData.updatedAt
        })
    }

    async add(product: Product): Promise<void> {

        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    }
}