var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var editViewModelBaseModule = require("../edit-view-model-base");
var viewReportViewModelModule = require("../view-report/view-report-view-model");
var serviceModule = require("../../utils/service");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var reportStatusModule = require("../../utils/report-status");
var notificationsModule = require("../../utils/notifications");
var EditReportViewModel = (function (_super) {
    __extends(EditReportViewModel, _super);
    function EditReportViewModel(report) {
        _super.call(this, report);
    }
    EditReportViewModel.prototype.createItem = function () {
        var item = _super.prototype.createItem.call(this);
        item.Status = reportStatusModule.New;
        item.Date = new Date();
        return item;
    };
    EditReportViewModel.prototype.addItem = function (item) {
        return serviceModule.service.createReport(item);
    };
    EditReportViewModel.prototype.updateItem = function (item) {
        return serviceModule.service.updateReport(item);
    };
    EditReportViewModel.prototype.validate = function () {
        if (!this.item.Title || this.item.Title === "") {
            notificationsModule.showError("Please enter title.");
            return false;
        }
        return _super.prototype.validate.call(this);
    };
    EditReportViewModel.prototype.deleteItem = function (item) {
        return serviceModule.service.deleteReport(item);
    };
    EditReportViewModel.prototype.onItemAdded = function (item) {
        _super.prototype.onItemAdded.call(this, item);
        navigationModule.navigate({
            moduleName: viewsModule.Views.viewReport,
            context: new viewReportViewModelModule.ViewReportViewModel(item)
        });
    };
    EditReportViewModel.prototype.onItemDeleted = function (item) {
        _super.prototype.onItemDeleted.call(this, item);
        navigationModule.goBack();
    };
    return EditReportViewModel;
})(editViewModelBaseModule.EditViewModelBase);
exports.EditReportViewModel = EditReportViewModel;
