import NotificationPattern from "../notification/notification";

export default abstract class Entity {

    public id: string;
    public notification: NotificationPattern;

    protected constructor() {
        this.notification = new NotificationPattern();
    }

}
