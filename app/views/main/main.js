"use strict";
var main_view_model_1 = require("./main-view-model");
var viewModel = new main_view_model_1.MainViewModel();
function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
exports.onNavigatingTo = onNavigatingTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLGdDQUE4QixtQkFBbUIsQ0FBQyxDQUFBO0FBRWxELElBQUksU0FBUyxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO0FBQ3BDLHdCQUErQixJQUFlO0lBQzFDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7SUFDaEMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3hCLENBQUM7QUFKZSxzQkFBYyxpQkFJN0IsQ0FBQSJ9