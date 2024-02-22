import CustomerRepository from "../../../infra/customer/repository/sequilize/customer.repository";
import Customer from "../../../domain/customer/entity/custumer";
import {Address} from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer('1', 'Customer 1');
const address = new Address('Street 1', 1, '12345', 'City 1');
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit Test Find Customer Use Case', () => {

    it('should find a customer', async () => {
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = {id: '1'};
        const output = {
            id: '1',
            name: 'Customer 1',
            address: {
                street: 'Street 1',
                city: 'City 1',
                number: 1,
                zip: '12345'
            }
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });

    it('should not find a customer',  async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error('Customer not found');
        });
        const useCase = new FindCustomerUseCase(customerRepository);

        const input = {id: '123'};

        await expect(() => {
            return useCase.execute(input)
        }).rejects.toThrow(`Customer not found`);
    });

});
