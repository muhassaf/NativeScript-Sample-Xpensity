var frame_1 = require("ui/frame");
var viewsModule = require("../../shared/views");
function navigate(view, context) {
    frame_1.topmost().navigate({
        moduleName: view,
        context: context
    });
}
exports.navigate = navigate;
function replace(view, context) {
    frame_1.topmost().navigate({
        moduleName: view,
        context: context,
        clearHistory: true
    });
}
exports.replace = replace;
function navigateById(viewId, context) {
    if (viewId == "#back") {
        goBack();
    }
    else {
        frame_1.topmost().navigate({
            moduleName: viewsModule[viewId],
            context: context
        });
    }
}
exports.navigateById = navigateById;
function main() {
    replace(viewsModule.main);
}
exports.main = main;
function login() {
    replace(viewsModule.login);
}
exports.login = login;
function goBack() {
    frame_1.topmost().goBack();
}
exports.goBack = goBack;
//# sourceMappingURL=navigation.js.map