import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice.entity";
import Product from "../../domain/entity/product.entity";
import Address from "../../../@shared/domain/value-object/address.value-object";
import FindInvoiceUsecase from "./find-invoice.usecase";

const address = new Address({
    street: "Street 1",
    number: "123",
    complement: "Complement",
    city: "City 1",
    state: "State 1",
    zipCode: "12345-678",
});

const product1 = new Product({ id: new Id("1"), name: "Item 1", price: 50 });
const product2 = new Product({ id: new Id("2"), name: "Item 2", price: 50 });
const product3 = new Product({ id: new Id("3"), name: "Item 3", price: 50 });

const invoice = new Invoice({
    id: new Id("1"),
    name: "Client 1",
    document: "1234567890",
    address,
    items: [product1, product2, product3]
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        save: jest.fn()
    }
}

describe("FindInvoiceUsecase test", () => {

    it("should find an invoice", async () => {

        const invoiceRepository = MockRepository();
        const usecase = new FindInvoiceUsecase(invoiceRepository);
        const input = {
            id: "1"
        };
        const output = await usecase.execute(input);
        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(output.id).toBe(invoice.id.value);
        expect(output.name).toBe(invoice.name);
        expect(output.document).toBe(invoice.document);
        expect(output.address).toBeDefined();
        expect(output.address.street).toBe(invoice.address.street);
        expect(output.address.city).toBe(invoice.address.city);
        expect(output.address.number).toBe(invoice.address.number);
        expect(output.address.complement).toBe(invoice.address.complement);
        expect(output.address.state).toBe(invoice.address.state);
        expect(output.address.zipCode).toBe(invoice.address.zipCode);
        expect(output.items.length).toEqual(3);
        expect(output.items[0].id).toBe(product1.id.value);
        expect(output.items[1].id).toBe(product2.id.value);
        expect(output.items[2].id).toBe(product3.id.value);
        expect(output.total).toBe(invoice.total);
        expect(output.createdAt).toBe(invoice.createdAt);
    });

});