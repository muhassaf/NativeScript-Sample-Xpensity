var service_1 = require("../../data/service");
var observable_array_1 = require("data/observable-array");
var view_model_base_1 = require("view-model-base");
var applicationSettingsModule = require("application-settings");
var NOTIFICATION_MESSAGES = "notification_messages";
var NotificationsViewModel = (function (_super) {
    __extends(NotificationsViewModel, _super);
    function NotificationsViewModel() {
        var _this = this;
        _super.call(this);
        this._notifications = new observable_array_1.ObservableArray();
        service_1.service.on(service_1.NotificationMessageEvent, function (args) {
            _this._notifications.unshift({
                Message: args.message,
                Date: new Date()
            });
            _this.serialize();
        });
    }
    Object.defineProperty(NotificationsViewModel.prototype, "notifications", {
        get: function () {
            return this._notifications;
        },
        enumerable: true,
        configurable: true
    });
    NotificationsViewModel.prototype.refresh = function () {
        this._notifications.length = 0;
        this._notifications.push(this.deserialize());
    };
    NotificationsViewModel.prototype.clear = function () {
        this._notifications.length = 0;
        this._notifications.notify({
            eventName: observable_array_1.ObservableArray.changeEvent,
            object: this._notifications
        });
        this.serialize();
    };
    NotificationsViewModel.prototype.deserialize = function () {
        var messages = JSON.parse(applicationSettingsModule.getString(NOTIFICATION_MESSAGES, "[]"));
        var result = [];
        messages.forEach(function (item) {
            result.push({
                Message: item.Message,
                Date: new Date(item.Date)
            });
        });
        return result;
    };
    NotificationsViewModel.prototype.serialize = function () {
        var items = [];
        this._notifications.forEach(function (item) {
            items.push(item);
        });
        applicationSettingsModule.setString(NOTIFICATION_MESSAGES, JSON.stringify(items));
    };
    return NotificationsViewModel;
})(view_model_base_1.ViewModelBase);
exports.NotificationsViewModel = NotificationsViewModel;
//# sourceMappingURL=notifications-view-model.js.map