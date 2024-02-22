import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infra/customer/repository/sequilize/customer.model";
import CustomerRepository from "../../../infra/customer/repository/sequilize/customer.repository";
import Customer from "../../../domain/customer/entity/custumer";
import {Address} from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe( 'Integration Test Find Customer Use Case', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it( 'should find a customer', async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer('1', 'Customer 1');
        const address = new Address('Street 1', 1, '12345', 'City 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = { id: '1' };
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

});
