import AddClientUsecase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("AddClient usecase test", () => {

    it("should create a client", async () => {

        const repository = MockRepository();
        const usecase = new AddClientUsecase(repository);
        const input = {
            id: "1",
            name: "John Doe",
            email: "john@doe.com",
            document: "12345678910",
            street: "Street 1",
            number: "123",
            complement: "Complement",
            city: "City 1",
            state: "State 1",
            zipCode: "12345-678",
        }
        const output = await usecase.execute(input);
        expect(repository.add).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toEqual(input.name);
        expect(output.street).toEqual(input.street);
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });
});