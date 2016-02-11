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
