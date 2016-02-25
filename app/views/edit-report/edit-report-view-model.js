"use strict";
var edit_view_model_base_1 = require("edit-view-model-base");
var service_1 = require("../../data/service");
var view_report_view_model_1 = require("../view-report/view-report-view-model");
var validationRulesModule = require("validation-rules");
var navigationModule = require("navigation");
var constants_1 = require("../../shared/constants");
var viewsModule = require("../../shared/views");
var constantsModule = require("../../shared/constants");
var EditReportViewModel = (function (_super) {
    __extends(EditReportViewModel, _super);
    function EditReportViewModel(report) {
        _super.call(this, report, constantsModule.reportProperties);
    }
    EditReportViewModel.prototype.addItem = function (item) {
        return service_1.service.createReport(item);
    };
    EditReportViewModel.prototype.updateItem = function (item) {
        return service_1.service.updateReport(item);
    };
    EditReportViewModel.prototype.deleteItem = function (item) {
        return service_1.service.deleteReport(item);
    };
    EditReportViewModel.prototype.validateOverride = function () {
        if (!validationRulesModule.isRequiredValid(this.item.Title)) {
            this.setErrorMessage("Please enter title.");
            return false;
        }
        return true;
    };
    EditReportViewModel.prototype.onItemAdded = function (item) {
        _super.prototype.onItemAdded.call(this, item);
        navigationModule.navigate(viewsModule.viewReport, { context: new view_report_view_model_1.ViewReportViewModel(item) });
    };
    EditReportViewModel.prototype.onItemDeleted = function (item) {
        _super.prototype.onItemDeleted.call(this, item);
        navigationModule.goBack();
    };
    EditReportViewModel.prototype.createItem = function () {
        var item = _super.prototype.createItem.call(this);
        item.Status = constants_1.reportStatus.inProgress;
        item.Date = new Date();
        return item;
    };
    return EditReportViewModel;
}(edit_view_model_base_1.EditViewModelBase));
exports.EditReportViewModel = EditReportViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1yZXBvcnQtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtcmVwb3J0LXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFDQUFrQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3pELHdCQUF3QixvQkFBb0IsQ0FBQyxDQUFBO0FBQzdDLHVDQUFvQyx1Q0FBdUMsQ0FBQyxDQUFBO0FBQzVFLElBQU8scUJBQXFCLFdBQVcsa0JBQWtCLENBQUMsQ0FBQztBQUMzRCxJQUFPLGdCQUFnQixXQUFXLFlBQVksQ0FBQyxDQUFDO0FBQ2hELDBCQUE2Qix3QkFBd0IsQ0FBQyxDQUFBO0FBRXRELElBQU8sV0FBVyxXQUFXLG9CQUFvQixDQUFDLENBQUM7QUFDbkQsSUFBTyxlQUFlLFdBQVcsd0JBQXdCLENBQUMsQ0FBQztBQUczRDtJQUF5Qyx1Q0FBaUI7SUFDdEQsNkJBQVksTUFBWTtRQUNwQixrQkFBTSxNQUFNLEVBQUUsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVTLHFDQUFPLEdBQWpCLFVBQWtCLElBQVM7UUFDdkIsTUFBTSxDQUFDLGlCQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFUyx3Q0FBVSxHQUFwQixVQUFxQixJQUFTO1FBQzFCLE1BQU0sQ0FBQyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRVMsd0NBQVUsR0FBcEIsVUFBcUIsSUFBUztRQUMxQixNQUFNLENBQUMsaUJBQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVTLDhDQUFnQixHQUExQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUU1QyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFUyx5Q0FBVyxHQUFyQixVQUFzQixJQUFTO1FBQzNCLGdCQUFLLENBQUMsV0FBVyxZQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksNENBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFUywyQ0FBYSxHQUF2QixVQUF3QixJQUFTO1FBQzdCLGdCQUFLLENBQUMsYUFBYSxZQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFUyx3Q0FBVSxHQUFwQjtRQUNJLElBQUksSUFBSSxHQUFHLGdCQUFLLENBQUMsVUFBVSxXQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBWSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFdkIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBNUNELENBQXlDLHdDQUFpQixHQTRDekQ7QUE1Q1ksMkJBQW1CLHNCQTRDL0IsQ0FBQSJ9