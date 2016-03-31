"use strict";
var sign_up_view_model_1 = require("./sign-up-view-model");
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = new sign_up_view_model_1.SignUpViewModel();
}
exports.onNavigatingTo = onNavigatingTo;
//# sourceMappingURL=sign-up.js.map