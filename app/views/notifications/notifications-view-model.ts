import { ViewModelBase } from "view-model-base";
import applicationSettingsModule = require("application-settings");

var NOTIFICATIONS = "notifications";

export class NotificationsViewModel extends ViewModelBase {
    private _notifications: any[];

    constructor() {
        super();
    }

    public get notifications(): any[] {
        return this._notifications;
    }

    public set notifications(value: any[]) {
        if (this._notifications !== value) {
            this._notifications = value;
            this.notifyPropertyChange("notifications", value);
        }
    }

    refresh() {
        this.notifications = JSON.parse(applicationSettingsModule.getString(NOTIFICATIONS, "[]"));
    }
}