var edit_expense_view_model_1 = require("./edit-expense-view-model");
var viewModel;
function onNavigatingTo(args) {
    if (!args.isBackNavigation) {
        var page = args.object;
        viewModel = page.navigationContext ? new edit_expense_view_model_1.EditExpenseViewModel(page.navigationContext.context, page.navigationContext.item) :
            new edit_expense_view_model_1.EditExpenseViewModel({ Id: "234" });
        page.bindingContext = viewModel;
    }
}
exports.onNavigatingTo = onNavigatingTo;
function onDoneTap(args) {
    viewModel.save();
}
exports.onDoneTap = onDoneTap;
function onTakePictureTap(args) {
    viewModel.takePicture();
}
exports.onTakePictureTap = onTakePictureTap;
//# sourceMappingURL=edit-expense.js.map