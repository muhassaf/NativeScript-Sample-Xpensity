"use strict";
var login_view_model_1 = require("./login-view-model");
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = new login_view_model_1.LoginViewModel();
}
exports.onNavigatingTo = onNavigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsaUNBQStCLG9CQUFvQixDQUFDLENBQUE7QUFHcEQsd0JBQStCLElBQWU7SUFDMUMsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksaUNBQWMsRUFBRSxDQUFDO0FBQy9DLENBQUM7QUFIZSxzQkFBYyxpQkFHN0IsQ0FBQSJ9