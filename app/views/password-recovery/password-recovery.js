var password_recovery_view_model_1 = require("./password-recovery-view-model");
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = new password_recovery_view_model_1.PasswordRecoveryViewModel();
}
exports.onNavigatingTo = onNavigatingTo;
