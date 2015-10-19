import observableModule = require("data/observable");

import { ViewModelBase } from "view-model-base";

import { ReportsViewModel } from "./reports-view-model";
import { NotificationsViewModel } from "./notifications-view-model";
import { SettingsViewModel } from "./settings-view-model";

export class MainViewModel extends ViewModelBase {
    private _selectedTab: number;
    private _reportsViewModel: ReportsViewModel;
    private _notificationsViewModel: NotificationsViewModel;
    private _settingsViewModel: SettingsViewModel;

    constructor() {
        super();

        this._selectedTab = 0;
    }

    public get selectedTab(): number {
        return this._selectedTab;
    }

    public set selectedTab(value: number) {
        if (this._selectedTab !== value) {
            this._selectedTab = value;
            this.notifyPropertyChange("selectedTab", value);
        }
    }

    public get reportsViewModel(): ReportsViewModel {
        if (!this._reportsViewModel) {
            this._reportsViewModel = new ReportsViewModel();
        }

        return this._reportsViewModel;
    }

    public get notificationsViewModel(): NotificationsViewModel {
        if (!this._notificationsViewModel) {
            this._notificationsViewModel = new NotificationsViewModel();
        }

        return this._notificationsViewModel;
    }

    public get settingsViewModel(): SettingsViewModel {
        if (!this._settingsViewModel) {
            this._settingsViewModel = new SettingsViewModel();
        }

        return this._settingsViewModel;
    }

    public refresh() {
        if (this._reportsViewModel) {
            this._reportsViewModel.refresh();
        }

        if (this._notificationsViewModel) {
            this.notificationsViewModel.refresh();
        }

        if (this._settingsViewModel) {
            this._settingsViewModel.refresh();
        }
    }
}