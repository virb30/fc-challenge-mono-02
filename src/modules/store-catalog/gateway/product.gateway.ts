import Product from "../domain/entity/product.entity";

export default interface ProductGateway {
    findAll(): Promise<Product[]>
    find(id: string): Promise<Product>;
}