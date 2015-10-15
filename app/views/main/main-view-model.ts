import observableModule = require("data/observable");

import { ViewModelBase } from "view-model-base";

import { ReportsViewModel } from "./reports-view-model";

//import notificationsViewModelModule = require("./notifications-view-model");
//import settingsViewModelModule = require("./settings-view-model");

export class MainViewModel extends ViewModelBase {
    private _reportsViewModel: ReportsViewModel;
    //private _notificationsViewModel: notificationsViewModelModule.NotificationsViewModel;
    //private _settingsViewModel: settingsViewModelModule.SettingsViewModel;

    constructor() {
        super();
    }

    public get reportsViewModel(): ReportsViewModel {
        if (!this._reportsViewModel) {
            this._reportsViewModel = new ReportsViewModel();
        }

        return this._reportsViewModel;
    }

    //get notificationsViewModel(): notificationsViewModelModule.NotificationsViewModel {
    //    if (!this._notificationsViewModel) {
    //        this._notificationsViewModel = new notificationsViewModelModule.NotificationsViewModel();
    //    }

    //    return this._notificationsViewModel;
    //}

    //get settingsViewModel(): settingsViewModelModule.SettingsViewModel {
    //    if (!this._settingsViewModel) {
    //        this._settingsViewModel = new settingsViewModelModule.SettingsViewModel();
    //    }

    //    return this._settingsViewModel;
    //}

    public refresh() {
        if (this._reportsViewModel) {
            this._reportsViewModel.refresh();
        }

    //    this.notificationsViewModel.refresh();
    //    this.settingsViewModel.refresh();
    }
}