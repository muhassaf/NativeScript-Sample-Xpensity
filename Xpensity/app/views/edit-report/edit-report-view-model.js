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
//# sourceMappingURL=edit-report-view-model.js.map