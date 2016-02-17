var viewModel;
function onNavigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel;
}
exports.onNavigatedTo = onNavigatedTo;
function onDoneTap() {
    viewModel.done();
}
exports.onDoneTap = onDoneTap;
//# sourceMappingURL=date-picker-popup.js.map