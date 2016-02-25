"use strict";
var edit_expense_view_model_1 = require("./edit-expense-view-model");
var viewModel;
function onNavigatingTo(args) {
    if (!args.isBackNavigation) {
        var page = args.object;
        viewModel = page.navigationContext ? new edit_expense_view_model_1.EditExpenseViewModel(page.navigationContext.context, page.navigationContext.item) :
            new edit_expense_view_model_1.EditExpenseViewModel({ Id: "234" });
        page.bindingContext = viewModel;
    }
}
exports.onNavigatingTo = onNavigatingTo;
function onDoneTap(args) {
    viewModel.save();
}
exports.onDoneTap = onDoneTap;
function onTakePictureTap(args) {
    viewModel.takePicture();
}
exports.onTakePictureTap = onTakePictureTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1leHBlbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdC1leHBlbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSx3Q0FBcUMsMkJBQTJCLENBQUMsQ0FBQTtBQUVqRSxJQUFJLFNBQStCLENBQUM7QUFDcEMsd0JBQStCLElBQW1CO0lBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdCLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSw4Q0FBb0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDdEgsSUFBSSw4Q0FBb0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0lBQ3BDLENBQUM7QUFDTCxDQUFDO0FBUGUsc0JBQWMsaUJBTzdCLENBQUE7QUFFRCxtQkFBMEIsSUFBZTtJQUNyQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUZlLGlCQUFTLFlBRXhCLENBQUE7QUFFRCwwQkFBaUMsSUFBZTtJQUM1QyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUZlLHdCQUFnQixtQkFFL0IsQ0FBQSJ9