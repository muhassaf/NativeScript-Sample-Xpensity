import { service, NotificationEventData, NotificationMessageEvent } from "../../shared/service";
import { ObservableArray } from "data/observable-array";
import { ViewModelBase } from "view-model-base";
import applicationSettingsModule = require("application-settings");

var NOTIFICATION_MESSAGES = "notification_messages";

export class NotificationsViewModel extends ViewModelBase {
    private _notifications: ObservableArray<any>;

    constructor() {
        super();

        this._notifications = new ObservableArray<any>();

        service.on(NotificationMessageEvent, (args: NotificationEventData) => {
            this._notifications.unshift({
                Message: args.message,
                Date: new Date()
            });

            this.serialize();
        });
    }

    public get notifications(): ObservableArray<any> {
        return this._notifications;
    }

    public refresh() {
        this._notifications.length = 0;
        this._notifications.push(this.deserialize());
    }

    public clear() {
        this._notifications.length = 0;
        this._notifications.notify({
            eventName: ObservableArray.changeEvent,
            object: this._notifications
        });

        this.serialize();
    }

    private deserialize(): any[] {
        var messages: any[] = JSON.parse(applicationSettingsModule.getString(NOTIFICATION_MESSAGES, "[]"));
        var result = [];
        messages.forEach((item: any) => {
            result.push({
                Message: item.Message,
                Date: new Date(item.Date)
            });
        });

        return result;
    }

    private serialize() {
        var items = [];
        this._notifications.forEach((item: any) => {
            items.push(item);
        });

        applicationSettingsModule.setString(NOTIFICATION_MESSAGES, JSON.stringify(items)); 
    }
}