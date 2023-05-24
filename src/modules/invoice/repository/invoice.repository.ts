import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice.entity";
import Product from "../domain/entity/product.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async save(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((product) => ({
                invoiceId: invoice.id.value,
                productId: product.id.value,
                name: product.name,
                price: product.price
            })),
            total: invoice.total,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        }, {
            include: [{ model: InvoiceItemModel }]
        });
    }

    async find(id: string): Promise<Invoice> {
        const invoiceData = await InvoiceModel.findOne({
            where: { id },
            include: ["items"]
        });

        const address = new Address({
            street: invoiceData.street,
            number: invoiceData.number,
            complement: invoiceData.complement,
            city: invoiceData.city,
            state: invoiceData.state,
            zipCode: invoiceData.zipCode,
        });

        const items = invoiceData.items.map((item) => {
            return new Product({
                id: new Id(item.productId),
                name: item.name,
                price: parseFloat(item.price)
            })
        });

        return new Invoice({
            id: new Id(invoiceData.id),
            name: invoiceData.name,
            document: invoiceData.document,
            address,
            items,
            createdAt: invoiceData.createdAt,
            updatedAt: invoiceData.updatedAt
        });
    }

}