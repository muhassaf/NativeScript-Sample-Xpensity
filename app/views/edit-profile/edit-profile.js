"use strict";
var edit_profile_view_model_1 = require("./edit-profile-view-model");
var viewModel;
function onNavigatingTo(args) {
    var page = args.object;
    viewModel = new edit_profile_view_model_1.EditProfileViewModel();
    page.bindingContext = viewModel;
}
exports.onNavigatingTo = onNavigatingTo;
function onDoneTap(args) {
    viewModel.save();
}
exports.onDoneTap = onDoneTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1wcm9maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdC1wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSx3Q0FBcUMsMkJBQTJCLENBQUMsQ0FBQTtBQUVqRSxJQUFJLFNBQStCLENBQUM7QUFDcEMsd0JBQStCLElBQWU7SUFDMUMsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3QixTQUFTLEdBQUcsSUFBSSw4Q0FBb0IsRUFBRSxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0FBQ3BDLENBQUM7QUFKZSxzQkFBYyxpQkFJN0IsQ0FBQTtBQUVELG1CQUEwQixJQUFlO0lBQ3JDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQixDQUFDO0FBRmUsaUJBQVMsWUFFeEIsQ0FBQSJ9