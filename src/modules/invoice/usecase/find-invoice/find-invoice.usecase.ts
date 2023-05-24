import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUsecase implements UseCaseInterface {

    constructor(private invoiceRepository: InvoiceGateway) { }


    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this.invoiceRepository.find(input.id);
        if (!invoice) {
            throw new Error("Invoice not found");
        }
        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode
            },
            items: invoice.items.map((item) => ({
                id: item.id.value,
                name: item.name,
                price: item.price
            })),
            total: invoice.total,
            createdAt: invoice.createdAt
        }
    }

}