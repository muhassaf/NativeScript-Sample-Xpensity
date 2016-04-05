var edit_report_view_model_1 = require("./edit-report-view-model");
var viewModel;
function onNavigatingTo(args) {
    var page = args.object;
    viewModel = page.navigationContext ? new edit_report_view_model_1.EditReportViewModel(page.navigationContext.context) : new edit_report_view_model_1.EditReportViewModel();
    page.bindingContext = viewModel;
}
exports.onNavigatingTo = onNavigatingTo;
function onDoneTap(args) {
    viewModel.save();
}
exports.onDoneTap = onDoneTap;
//# sourceMappingURL=edit-report.js.map