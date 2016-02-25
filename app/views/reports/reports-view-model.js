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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVwb3J0cy12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw0QkFBOEMsYUFBYSxDQUFDLENBQUE7QUFFNUQsZ0NBQTRDLGlCQUFpQixDQUFDLENBQUE7QUFDOUQsdUNBQW9DLHVDQUF1QyxDQUFDLENBQUE7QUFDNUUsd0JBQXlDLG9CQUFvQixDQUFDLENBQUE7QUFDOUQsSUFBTyxlQUFlLFdBQVcsd0JBQXdCLENBQUMsQ0FBQztBQUUzRDtJQUFzQyxvQ0FBYTtJQUcvQztRQUNJLGlCQUFPLENBQUM7UUFFUixJQUFJLE9BQU8sR0FBRyxJQUFJLCtCQUFpQixFQUFFLENBQUM7UUFDdEMsT0FBTyxDQUFDLFFBQVEsR0FBRyx3QkFBYyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBQyxPQUFjO1lBQ2hDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxTQUFTLEdBQUcsSUFBSSw0Q0FBbUIsQ0FBQyw4QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO2dCQUNuRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHdCQUFVLENBQUMsa0JBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsc0JBQUkscUNBQU87YUFBWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsa0NBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUE3QkQsQ0FBc0MsK0JBQWEsR0E2QmxEO0FBN0JZLHdCQUFnQixtQkE2QjVCLENBQUEifQ==