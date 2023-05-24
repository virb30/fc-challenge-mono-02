export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    street: string;
    number: string;
    zipCode: string;
    city: string;
    state: string;
    complement: string;

}

export interface FindClientFacadeInputDto {
    id: string;
}

export interface FindClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    document: string;
    street: string;
    number: string;
    zipCode: string;
    city: string;
    state: string;
    complement: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
    add(input: AddClientFacadeInputDto): Promise<void>;
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}