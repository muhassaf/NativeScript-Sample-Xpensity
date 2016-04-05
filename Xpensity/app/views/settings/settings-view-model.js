var view_model_base_1 = require("view-model-base");
var service_1 = require("../../data/service");
var navigationModule = require("navigation");
var applicationSettingsModule = require("application-settings");
var OFFLINE_MODE = "offlineMode";
var NOTIFICATIONS = "notifications";
var SettingsViewModel = (function (_super) {
    __extends(SettingsViewModel, _super);
    function SettingsViewModel(owner) {
        _super.call(this);
        this._owner = owner;
        this.notifications = applicationSettingsModule.getBoolean(NOTIFICATIONS, true);
        this.offlineMode = applicationSettingsModule.getBoolean(OFFLINE_MODE, true);
    }
    Object.defineProperty(SettingsViewModel.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            if (this._name !== value) {
                this._name = value;
                this.notifyPropertyChange("name", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsViewModel.prototype, "offlineMode", {
        get: function () {
            return applicationSettingsModule.getBoolean(OFFLINE_MODE, false);
        },
        set: function (value) {
            applicationSettingsModule.setBoolean(OFFLINE_MODE, value);
            service_1.service.switchOfflineMode(value);
            this.notifyPropertyChange("offlineMode", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsViewModel.prototype, "notifications", {
        get: function () {
            return applicationSettingsModule.getBoolean(NOTIFICATIONS, true);
        },
        set: function (value) {
            var _this = this;
            this.execute(service_1.service.switchNotifications(value)).then(function () {
                _this.setNotifications(value);
            }, function (error) {
                _this.setNotifications(false);
            });
        },
        enumerable: true,
        configurable: true
    });
    SettingsViewModel.prototype.setNotifications = function (value) {
        applicationSettingsModule.setBoolean(NOTIFICATIONS, value);
        this.notifyPropertyChange("notifications", value);
    };
    SettingsViewModel.prototype.logout = function () {
        var _this = this;
        this.execute(service_1.service.logout())
            .then(function () {
            navigationModule.login();
            _this._owner.selectedTab = 0;
        });
    };
    SettingsViewModel.prototype.refresh = function () {
        if (service_1.service.currentUser) {
            this.name = service_1.service.currentUser.DisplayName;
        }
    };
    return SettingsViewModel;
})(view_model_base_1.ViewModelBase);
exports.SettingsViewModel = SettingsViewModel;
//# sourceMappingURL=settings-view-model.js.map