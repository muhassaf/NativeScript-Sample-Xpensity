var main_view_model_1 = require("./main-view-model");
var viewModel = new main_view_model_1.MainViewModel();
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
exports.onNavigatingTo = onNavigatingTo;
//# sourceMappingURL=main.js.map