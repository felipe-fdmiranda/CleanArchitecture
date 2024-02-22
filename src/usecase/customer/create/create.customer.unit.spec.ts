import CreateCustomerUseCase from "./create.customer.usecase";
import {InputCreateCustomerDto} from "./create.customer.dto";

const input = {
    name: 'Customer 1',
    address: {
        street: 'Street 1',
        number: 1,
        zip: '12345',
        city: 'City 1'
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit Test Create Customer Use Case', () => {

        it('should create a customer', async () => {
            const customerRepository = MockRepository();
            const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
            const output = await createCustomerUseCase.execute(input);

            expect(output).toEqual({
                id: expect.any(String),
                name: input.name,
                address: {
                    street: input.address.street,
                    city: input.address.city,
                    number: input.address.number,
                    zip: input.address.zip
                }
            });
        });

        it('should throw an error when name is missing', async () => {
            const customerRepository = MockRepository();
            const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
            input.name = '';
            await expect(createCustomerUseCase.execute(input)).rejects.toThrow('Name is required');
        });

        it('should throw an error when street is missing', async () => {
            const customerRepository = MockRepository();
            const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
            input.name = 'Customer 1';
            input.address.street = '';
            await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Street is required");
        });

});
