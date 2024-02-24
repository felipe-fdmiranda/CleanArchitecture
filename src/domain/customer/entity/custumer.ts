// EM DDD OS DADOS SEMPRE DEVEM ESTAR CONSISTENTES
// UMA ENTIDADE POR PADRAO ELA TEM QUE SE AUTO VALIDAR

import {Address} from "../value-object/address";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "./factory/customer.validator.factory";

export default class Customer extends Entity {

    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this.id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get name() {
        return this._name;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

    isActive() {
        return this._active;
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    get address() {
        return this._address;
    }
}
