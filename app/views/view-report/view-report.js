"use strict";
var view_report_view_model_1 = require("./view-report-view-model");
var viewModel;
function onNavigatingTo(args) {
    if (!args.isBackNavigation) {
        var page = args.object;
        viewModel = new view_report_view_model_1.ViewReportViewModel(page.navigationContext.item.report);
        page.bindingContext = viewModel;
    }
    viewModel.refresh();
}
exports.onNavigatingTo = onNavigatingTo;
function onItemTap(args) {
    viewModel.itemTap(args.view.bindingContext);
}
exports.onItemTap = onItemTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1yZXBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aWV3LXJlcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsdUNBQW9DLDBCQUEwQixDQUFDLENBQUE7QUFFL0QsSUFBSSxTQUE4QixDQUFDO0FBQ25DLHdCQUErQixJQUFtQjtJQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3QixTQUFTLEdBQUcsSUFBSSw0Q0FBbUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDeEIsQ0FBQztBQVJlLHNCQUFjLGlCQVE3QixDQUFBO0FBRUQsbUJBQTBCLElBQW1CO0lBQ3pDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRmUsaUJBQVMsWUFFeEIsQ0FBQSJ9