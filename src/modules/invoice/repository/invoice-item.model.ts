import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "./product.model";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "invoice_items",
    timestamps: false
})
export default class InvoiceItemModel extends Model {
    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false, field: "invoice_id" })
    invoiceId: string;

    @BelongsTo(() => InvoiceModel)
    invoice: InvoiceModel;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false, field: "product_id" })
    productId: string;

    @BelongsTo(() => ProductModel)
    product: ProductModel;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    price: string;
}