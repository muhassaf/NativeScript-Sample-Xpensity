import { EventData } from "data/observable";
import { Page } from "ui/page";

import { EditProfileViewModel } from "./edit-profile-view-model";

var viewModel: EditProfileViewModel;
export function onNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    viewModel = new EditProfileViewModel();
    page.bindingContext = viewModel;
} 

export function onDoneTap(args: EventData) {
    viewModel.save();
}