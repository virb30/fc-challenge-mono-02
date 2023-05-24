import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

type InvoiceFacadeProps = {
    generateInvoiceUsecase: UseCaseInterface;
    findInvoiceUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private generateInvoiceUsecase: UseCaseInterface;
    private findInvoiceUsecase: UseCaseInterface;

    constructor(props: InvoiceFacadeProps) {
        this.generateInvoiceUsecase = props.generateInvoiceUsecase;
        this.findInvoiceUsecase = props.findInvoiceUsecase;
    }


    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this.generateInvoiceUsecase.execute(input);
    }

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this.findInvoiceUsecase.execute(input);
    }
}