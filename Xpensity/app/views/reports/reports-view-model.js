"use strict";
var data_source_1 = require("data-source");
var view_model_base_1 = require("view-model-base");
var view_report_view_model_1 = require("../view-report/view-report-view-model");
var service_1 = require("../../data/service");
var constantsModule = require("../../shared/constants");
var ReportsViewModel = (function (_super) {
    __extends(ReportsViewModel, _super);
    function ReportsViewModel() {
        _super.call(this);
        var options = new data_source_1.DataSourceOptions();
        options.typeName = service_1.ReportTypeName;
        options.extendFunc = function (reports) {
            var result = [];
            for (var i = 0; i < reports.length; i++) {
                var viewModel = new view_report_view_model_1.ViewReportViewModel(view_model_base_1.toObservable(reports[i], constantsModule.reportProperties));
                viewModel.refresh();
                result.push(viewModel);
            }
            return result;
        };
        this._reports = new data_source_1.DataSource(service_1.everlive, options);
    }
    Object.defineProperty(ReportsViewModel.prototype, "reports", {
        get: function () {
            return this._reports;
        },
        enumerable: true,
        configurable: true
    });
    ReportsViewModel.prototype.refresh = function () {
        this.execute(this._reports.reload());
    };
    return ReportsViewModel;
}(view_model_base_1.ViewModelBase));
exports.ReportsViewModel = ReportsViewModel;
//# sourceMappingURL=reports-view-model.js.map