var view_expense_view_model_1 = require("./view-expense-view-model");
var viewModel;
function onNavigatingTo(args) {
    var page = args.object;
    viewModel = new view_expense_view_model_1.ViewExpenseViewModel(page.navigationContext.item);
    page.bindingContext = viewModel;
}
exports.onNavigatingTo = onNavigatingTo;
