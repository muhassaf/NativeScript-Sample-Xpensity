var login_view_model_1 = require("./login-view-model");
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = new login_view_model_1.LoginViewModel();
}
exports.onNavigatingTo = onNavigatingTo;
//# sourceMappingURL=login.js.map