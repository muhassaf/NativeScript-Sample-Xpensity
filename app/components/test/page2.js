var frameModule = require("ui/frame");
function navigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
}
exports.navigatedTo = navigatedTo;
function doneMenuItemTap(args) {
    frameModule.topmost().navigate("components/test/page1");
}
exports.doneMenuItemTap = doneMenuItemTap;
