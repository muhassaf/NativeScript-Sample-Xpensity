import applicationSettingsModule = require("application-settings");

import observableModule = require("data/observable");
import observableArrayModule = require("data/observable-array");

import dialogsModule = require("ui/dialogs");

import editViewModelBaseModule = require("../edit-view-model-base");
import viewReportViewModelModule = require("../view-report/view-report-view-model");

import constantsModule = require("../../utils/constants");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import reportStatusModule = require("../../utils/report-status");
import notificationsModule = require("../../utils/notifications");

export class EditReportViewModel extends editViewModelBaseModule.EditViewModelBase {
    constructor(report?: any) {
        super(report);
    }

    createItem(): any {
        var item = super.createItem();
        item.Status = reportStatusModule.New;
        item.Date = new Date();

        return item;
    }

    addItem(item: any): Promise<any> {
        return serviceModule.service.createReport(item);
    }

    updateItem(item: any): Promise<any> {
        return serviceModule.service.updateReport(item);
    }

    validate(): boolean {
        if (!this.item.Title || this.item.Title === "") {
            notificationsModule.showError("Please enter title.");
            return false;
        }

        return super.validate();
    }

    deleteItem(item: any): Promise<any> {
        return serviceModule.service.deleteReport(item);
    }

    onItemAdded(item: any) {
        console.log("ITEM: " + JSON.stringify(item));
        super.onItemAdded(item);
        navigationModule.navigate({
            moduleName: viewsModule.Views.viewReport,
            context: new viewReportViewModelModule.ViewReportViewModel(item)
        });
    }

    onItemDeleted(item: any) {
        super.onItemDeleted(item);
        navigationModule.goBack();
    }
}