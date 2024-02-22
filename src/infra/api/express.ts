import express, { Express } from 'express';
import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequilize/customer.model";
import {CustomerRouter} from "./routes/customer.router";

export const app: Express = express();
app.use(express.json());
app.use('/customer', CustomerRouter);

export let sequilize: Sequelize;

async function setupDb() {
    sequilize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
    });
    sequilize.addModels([CustomerModel]);
    await sequilize.sync();
}
setupDb();
