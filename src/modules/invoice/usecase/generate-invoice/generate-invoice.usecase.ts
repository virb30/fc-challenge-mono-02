import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Invoice from "../../domain/entity/invoice.entity";
import Product from "../../domain/entity/product.entity";
import Address from "../../../@shared/domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUsecase implements UseCaseInterface {

    constructor(private invoiceRepository: InvoiceGateway) { }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const address = new Address({
            street: input.street,
            state: input.state,
            city: input.city,
            zipCode: input.zipCode,
            complement: input.complement,
            number: input.number
        });
        const items = input.items.map((item) => {
            return new Product({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            })
        })

        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            items,
            address
        });

        await this.invoiceRepository.save(invoice);

        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => {
                return {
                    id: item.id.value,
                    name: item.name,
                    price: item.price
                }
            }),
            total: invoice.total
        }


    }
}