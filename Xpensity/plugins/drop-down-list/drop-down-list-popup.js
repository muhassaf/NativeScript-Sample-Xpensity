var viewModel;
function onNavigatingTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel;
}
exports.onNavigatingTo = onNavigatingTo;
function onItemTap(args) {
    viewModel.selectItem(args.view.bindingContext);
}
exports.onItemTap = onItemTap;
function onDoneTap() {
    viewModel.done();
}
exports.onDoneTap = onDoneTap;
//# sourceMappingURL=drop-down-list-popup.js.map