import { ViewModelBase } from "view-model-base";

import { service } from "../../data/service";
import navigationModule = require("navigation");
import applicationSettingsModule = require("application-settings");
import { MainViewModel } from "../main/main-view-model";

var OFFLINE_MODE = "offlineMode";
var NOTIFICATIONS = "notifications";
export class SettingsViewModel extends ViewModelBase {
    private _owner: MainViewModel;
    private _name: string;

    constructor(owner: MainViewModel) {
        super();

        this._owner = owner;

        this.notifications = applicationSettingsModule.getBoolean(NOTIFICATIONS, true);
        this.offlineMode = applicationSettingsModule.getBoolean(OFFLINE_MODE, true);
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChange("name", value);
        }
    }

    public get offlineMode(): boolean {
        return applicationSettingsModule.getBoolean(OFFLINE_MODE, false);
    }

    public set offlineMode(value: boolean) {
        applicationSettingsModule.setBoolean(OFFLINE_MODE, value);
        service.switchOfflineMode(value);
        this.notifyPropertyChange("offlineMode", value);
    }

    public get notifications(): boolean {
        return applicationSettingsModule.getBoolean(NOTIFICATIONS, true);
    }

    public set notifications(value: boolean) {
        this.execute(service.switchNotifications(value)).then(() => {
            this.setNotifications(value);
        }, (error) => {
            this.setNotifications(false);
        });
    }

    private setNotifications(value: boolean) {
        applicationSettingsModule.setBoolean(NOTIFICATIONS, value);
        this.notifyPropertyChange("notifications", value);
    }

    public logout() {
        this.execute(service.logout())
            .then(() => {
                navigationModule.login();
                this._owner.selectedTab = 0;
            });
    }

    public refresh() {
        if (service.currentUser) {
            this.name = service.currentUser.DisplayName;
        }
    }
}