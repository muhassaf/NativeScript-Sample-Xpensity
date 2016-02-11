var view_report_view_model_1 = require("./view-report-view-model");
var viewModel;
function onNavigatingTo(args) {
    if (!args.isBackNavigation) {
        var page = args.object;
        viewModel = new view_report_view_model_1.ViewReportViewModel(page.navigationContext.context.report);
        page.bindingContext = viewModel;
    }
    viewModel.refresh();
}
exports.onNavigatingTo = onNavigatingTo;
function onItemTap(args) {
    viewModel.itemTap(args.view.bindingContext);
}
exports.onItemTap = onItemTap;
