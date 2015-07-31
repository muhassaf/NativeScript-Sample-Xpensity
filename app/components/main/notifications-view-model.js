var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../view-model-base");
var serviceModule = require("../../utils/service");
var NotificationsViewModel = (function (_super) {
    __extends(NotificationsViewModel, _super);
    function NotificationsViewModel() {
        _super.call(this);
    }
    Object.defineProperty(NotificationsViewModel.prototype, "reportsForApproval", {
        get: function () {
            return this._reportsForApproval;
        },
        set: function (value) {
            if (this._reportsForApproval !== value) {
                this._reportsForApproval = value;
                this.notifyPropertyChanged("reportsForApproval", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    NotificationsViewModel.prototype.refresh = function () {
        var _this = this;
        this.beginLoading();
        serviceModule.service.getReportsForApproval().then(function (reportsForApproval) {
            _this.reportsForApproval = reportsForApproval;
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    return NotificationsViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.NotificationsViewModel = NotificationsViewModel;
