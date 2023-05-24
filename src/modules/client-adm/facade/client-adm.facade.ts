import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface UsecaseProps {
    findClientUsecase: UseCaseInterface;
    addClientUsecase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _findClientUsecase: UseCaseInterface;
    private _addClientUsecase: UseCaseInterface;

    constructor(usecaseProps: UsecaseProps) {
        this._addClientUsecase = usecaseProps.addClientUsecase;
        this._findClientUsecase = usecaseProps.findClientUsecase;
    }


    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addClientUsecase.execute(input);
    }

    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return this._findClientUsecase.execute(input);
    }

}