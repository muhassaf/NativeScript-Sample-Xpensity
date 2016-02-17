import observableModule = require("data/observable");

import { ViewModelBase } from "view-model-base";

import { ReportsViewModel } from "../reports/reports-view-model";
import { NotificationsViewModel } from "../notifications/notifications-view-model";
import { SettingsViewModel } from "../settings/settings-view-model";
import { service } from "../../data/service";

export class MainViewModel extends ViewModelBase {
    private _selectedTab: number;
    private _reportsViewModel: ReportsViewModel;
    private _notificationsViewModel: NotificationsViewModel;
    private _settingsViewModel: SettingsViewModel;

    constructor() {
        super();

        this._selectedTab = 0;
        this._reportsViewModel = new ReportsViewModel();
        this._notificationsViewModel = new NotificationsViewModel();
        this._settingsViewModel = new SettingsViewModel(this);
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
        return this._reportsViewModel;
    }

    public get notificationsViewModel(): NotificationsViewModel {
        return this._notificationsViewModel;
    }

    public get settingsViewModel(): SettingsViewModel {
        return this._settingsViewModel;
    }

    public clearNotification() {
        this._notificationsViewModel.clear();
    }

    public refresh() {
        this._reportsViewModel.refresh();
        this._notificationsViewModel.refresh();
        this._settingsViewModel.refresh();
    }
}