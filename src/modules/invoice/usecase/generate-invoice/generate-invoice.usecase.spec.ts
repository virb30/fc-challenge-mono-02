import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        save: jest.fn()
    }
}


describe("GenerateInvoiceUsecase test", () => {

    it("should generate an invoice", async () => {
        const invoiceRepository = MockRepository();
        const usecase = new GenerateInvoiceUsecase(invoiceRepository);
        const input = {
            name: "Client 1",
            document: "1234567890",
            street: "Street 1",
            number: "123",
            complement: "Complement",
            city: "City 1",
            state: "State 1",
            zipCode: "12345-678",
            items: [
                { id: "1", name: "Item 1", price: 50 },
                { id: "2", name: "Item 2", price: 60 },
                { id: "3", name: "Item 3", price: 100 },
            ]
        };
        const output = await usecase.execute(input);
        expect(invoiceRepository.save).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.total).toBe(210);
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.street).toBe(input.street);
        expect(output.number).toBe(input.number);
        expect(output.city).toBe(input.city);
        expect(output.complement).toBe(input.complement);
        expect(output.state).toBe(input.state);
        expect(output.zipCode).toBe(input.zipCode);
    });
});