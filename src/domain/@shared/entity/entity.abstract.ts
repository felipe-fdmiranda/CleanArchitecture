import NotificationPattern from "../notification/notification";

export default abstract class Entity {

    protected id: string;
    protected notification: NotificationPattern;

    protected constructor() {
        this.notification = new NotificationPattern();
    }
}
