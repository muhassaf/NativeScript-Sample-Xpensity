import { EditViewModelBase } from "edit-view-model-base";
import { service } from "../../shared/service";
import { ViewReportViewModel } from "../view-report/view-report-view-model";
import validationRulesModule = require("../../shared/validation-rules");
import navigationModule = require("navigation");
import { reportStatus } from "../../shared/constants";

import viewsModule = require("../../shared/views");


export class EditReportViewModel extends EditViewModelBase {
    constructor(report?: any) {
        super(report);
    }

    protected addItem(item: any): Promise<any> {
        return service.createReport(item);
    }

    protected updateItem(item: any): Promise<any> {
        return service.updateReport(item);
    }

    protected deleteItem(item: any): Promise<any> {
        return service.deleteReport(item);
    }

    protected validateOverride(): boolean {
        if (!validationRulesModule.isRequiredValid(this.item.Title)) {
            this.setErrorMessage("Please enter title.");

            return false;
        }

        return true;
    }

    protected onItemAdded(item: any) {
        super.onItemAdded(item);
        navigationModule.navigate(viewsModule.viewReport, { context: new ViewReportViewModel(item) });
    }

    protected onItemDeleted(item: any) {
        super.onItemDeleted(item);
        navigationModule.goBack();
    }

    protected createItem(): any {
        var item = super.createItem();
        item.Status = reportStatus.inProgress;
        item.Date = new Date();

        return item;
    }
}