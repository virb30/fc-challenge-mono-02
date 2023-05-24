import ClientAdmFacade from "../facade/client-adm.facade";
import ClientAdmFacadeInterface from "../facade/client-adm.facade.interface";
import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import { FindClientUsecase } from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    static create(): ClientAdmFacadeInterface {
        const repository = new ClientRepository();
        const findClientUsecase = new FindClientUsecase(repository);
        const addClientUsecase = new AddClientUsecase(repository);
        const facade = new ClientAdmFacade({
            addClientUsecase,
            findClientUsecase
        });
        return facade;
    }
}