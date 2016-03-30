"use strict";
var view_model_base_1 = require("view-model-base");
var reports_view_model_1 = require("../reports/reports-view-model");
var notifications_view_model_1 = require("../notifications/notifications-view-model");
var settings_view_model_1 = require("../settings/settings-view-model");
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);
        this._selectedTab = 0;
        this._reportsViewModel = new reports_view_model_1.ReportsViewModel();
        this._notificationsViewModel = new notifications_view_model_1.NotificationsViewModel();
        this._settingsViewModel = new settings_view_model_1.SettingsViewModel(this);
    }
    Object.defineProperty(MainViewModel.prototype, "selectedTab", {
        get: function () {
            return this._selectedTab;
        },
        set: function (value) {
            if (this._selectedTab !== value) {
                this._selectedTab = value;
                this.notifyPropertyChange("selectedTab", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "reportsViewModel", {
        get: function () {
            return this._reportsViewModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "notificationsViewModel", {
        get: function () {
            return this._notificationsViewModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "settingsViewModel", {
        get: function () {
            return this._settingsViewModel;
        },
        enumerable: true,
        configurable: true
    });
    MainViewModel.prototype.clearNotification = function () {
        this._notificationsViewModel.clear();
    };
    MainViewModel.prototype.refresh = function () {
        this._reportsViewModel.refresh();
        this._notificationsViewModel.refresh();
        this._settingsViewModel.refresh();
    };
    return MainViewModel;
}(view_model_base_1.ViewModelBase));
exports.MainViewModel = MainViewModel;
//# sourceMappingURL=main-view-model.js.map