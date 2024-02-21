import OrderItem from "../entity/order_item";
import {Order} from "../entity/order";
import OrderService from "./order.service";
import Customer from "../../customer/entity/custumer";

describe('Order Service unit tests', () => {

    it('should place an order', () => {

        const customer1 = new Customer('c1', 'customer1');
        const item1 = new OrderItem('i1', 'item1', 10, 'p1', 1);

        const order = OrderService.placeOrder(customer1, [item1]);

        expect(customer1.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);

    });

    it('should get total of all orders', () => {

        const item1 = new OrderItem('i1', 'item1', 100, 'p1', 1);
        const item2 = new OrderItem('i2', 'item2', 200, 'p2', 2);

        const order1 = new Order('o1', 'c1', [item1]);
        const order2 = new Order('o2', 'c2', [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);

    });

});
