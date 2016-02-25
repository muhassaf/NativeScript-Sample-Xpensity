"use strict";
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
}(view_model_base_1.ViewModelBase));
exports.SettingsViewModel = SettingsViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Mtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGdDQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBRWhELHdCQUF3QixvQkFBb0IsQ0FBQyxDQUFBO0FBQzdDLElBQU8sZ0JBQWdCLFdBQVcsWUFBWSxDQUFDLENBQUM7QUFDaEQsSUFBTyx5QkFBeUIsV0FBVyxzQkFBc0IsQ0FBQyxDQUFDO0FBR25FLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQztBQUNqQyxJQUFJLGFBQWEsR0FBRyxlQUFlLENBQUM7QUFDcEM7SUFBdUMscUNBQWE7SUFJaEQsMkJBQVksS0FBb0I7UUFDNUIsaUJBQU8sQ0FBQztRQUVSLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBCLElBQUksQ0FBQyxhQUFhLEdBQUcseUJBQXlCLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsV0FBVyxHQUFHLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELHNCQUFXLG1DQUFJO2FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBRUQsVUFBZ0IsS0FBYTtZQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNELHNCQUFXLDBDQUFXO2FBQXRCO1lBQ0ksTUFBTSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckUsQ0FBQzthQUVELFVBQXVCLEtBQWM7WUFDakMseUJBQXlCLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxRCxpQkFBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsQ0FBQzs7O09BTkE7SUFRRCxzQkFBVyw0Q0FBYTthQUF4QjtZQUNJLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLENBQUM7YUFFRCxVQUF5QixLQUFjO1lBQXZDLGlCQU1DO1lBTEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBTyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNsRCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsQ0FBQyxFQUFFLFVBQUMsS0FBSztnQkFDTCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDOzs7T0FSQTtJQVVPLDRDQUFnQixHQUF4QixVQUF5QixLQUFjO1FBQ25DLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sa0NBQU0sR0FBYjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3pCLElBQUksQ0FBQztZQUNGLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTSxtQ0FBTyxHQUFkO1FBQ0ksRUFBRSxDQUFDLENBQUMsaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ2hELENBQUM7SUFDTCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBaEVELENBQXVDLCtCQUFhLEdBZ0VuRDtBQWhFWSx5QkFBaUIsb0JBZ0U3QixDQUFBIn0=