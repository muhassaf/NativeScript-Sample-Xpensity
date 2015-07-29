var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../view-model-base");
var viewReportViewModelModule = require("../view-report/view-report-view-model");
var serviceModule = require("../../utils/service");
var ReportsViewModel = (function (_super) {
    __extends(ReportsViewModel, _super);
    function ReportsViewModel() {
        _super.call(this);
    }
    Object.defineProperty(ReportsViewModel.prototype, "reports", {
        get: function () {
            return this._reports;
        },
        set: function (value) {
            if (this._reports !== value) {
                this._reports = value;
                this.notifyPropertyChanged("reports", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ReportsViewModel.prototype.refresh = function () {
        var _this = this;
        this.beginLoading();
        serviceModule.service.getReports().then(function (data) {
            var reports = new Array();
            for (var i = 0; i < data.length; i++) {
                reports.push(new viewReportViewModelModule.ViewReportViewModel(data[i]));
            }
            _this.reports = reports;
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    return ReportsViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.ReportsViewModel = ReportsViewModel;
