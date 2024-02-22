import CustomerFactory from "../../../domain/customer/entity/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John", "Street 1", 123, "Zip", "City"
);

const input = {
    id: customer.id,
    name: "John Updated",
    address: {
        street: "Street 1 Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit Test Update Customer Use Case', () => {

    it('should update a customer', async () => {
        const customerRepository = MockRepository();
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
        const output = await updateCustomerUseCase.execute(input);

        expect(output).toEqual(input);
    });

    /*it('should throw an error when name is missing', async () => {
        const customerRepository = MockRepository();
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
        input.name = '';
        await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Name is required');
    });

    it('should throw an error when street is missing', async () => {
        const customerRepository = MockRepository();
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
        input.name = 'John';
        input.address.street = '';
        await expect(updateCustomerUseCase.execute(input)).rejects.toThrow("Street is required");
    });

    it('should throw an error when customer is not found', async () => {
        const customerRepository = MockRepository();
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
        customerRepository.find = jest.fn().mockReturnValue(Promise.resolve(null));
        await expect(updateCustomerUseCase.execute(input)).rejects.toThrow("Customer not found");
    });*/

});
