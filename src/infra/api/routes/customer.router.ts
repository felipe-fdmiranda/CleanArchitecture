import express, {Request, Response} from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequilize/customer.repository";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerPresenter from "../presenters/customer.presenter";

export const CustomerRouter = express.Router();

CustomerRouter.post('/', async (req: Request, res: Response) => {
    const usercase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                zip: req.body.address.zip,
                number: req.body.address.number
            }
        };

        const output = await usercase.execute(customerDto);
        res.send(output);
    } catch (e) {
        res.status(500).send(e);
    }
});

CustomerRouter.get('/', async (req: Request, res: Response) => {
    const usercase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await usercase.execute({});
        res.format({
            json: async () => {
                res.send(output);
            },
            xml: async () => {
                res.send(CustomerPresenter.listXML(output));
            }
        });
    } catch (e) {
        res.status(500).send(e);
    }
});
