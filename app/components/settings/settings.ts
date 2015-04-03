import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import settingsViewModelModule = require("./settings-view-model");

export function pageLoaded(args: any) {
    var page = <pagesModule.Page>args.object;
    page.bindingContext = new settingsViewModelModule.SettingsViewModel();
}
