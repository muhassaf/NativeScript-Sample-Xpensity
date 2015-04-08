import observableModule = require("data/observable");

import editExpenseViewModelModule = require("../edit-expense/edit-expense-view-model");
import editReportViewModelModule = require("../edit-report/edit-report-view-model");

import viewModelBaseModule = require("../view-model-base");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import notificationsModule = require("../../utils/notifications");

export class ViewReportViewModel extends viewModelBaseModule.ViewModelBase {
    private _report: any;
    private _status: string;

    constructor(report: any) {
        super();

        this.report = report;
    }

    get report(): any {
        return this._report;
    }

    set report(value: any) {
        if (this._report !== value) {
            this._report = value;
            this.notifyPropertyChanged("report", value);
        }
    }

    get expensesByCategory(): any[] {
        return [
            { Category: "Food & Dining", Total: 25 },
            { Category: "Fees & Changes", Total: 25 },
            { Category: "Business Services", Total: 12.5 },
            { Category: "Personal Care", Total: 12.5 },
            { Category: "Auto & Transport", Total: 25 }
        ];
    }

    get expenses(): any[]{
        return [
            { Title: "Dinner", Cost: 132.33, Date: new Date(Date.now()), Location: "Panera Bread, Boston", Category: "Auto & Transport" },
            { Title: "Taxi", Cost: 15.33, Date: new Date(Date.now()), Location: "Uber, Boston", Category: "Auto & Transport" },
            { Title: "Hotel", Cost: 340.54, Date: new Date(Date.now()), Location: "Grand Hotel Boston, Boston", Category: "Auto & Transport" },
        ];
    }

    get total(): number {
        return 1500;
    }

    showReportInfo() {
        notificationsModule.showInfo(this.report.Info);
    }

    submit() {
        this.report.Status = ReportStatus.ForApproval;
    }

    edit() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editReport,
            context: new editReportViewModelModule.EditReportViewModel(this.report)
        });
    }

    addExpense() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editExpense,
            context: new editExpenseViewModelModule.EditExpenseViewModel(this)
        });
    }

    editExpense(expense: any) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editExpense,
            context: new editExpenseViewModelModule.EditExpenseViewModel(this, expense)
        });
    }
}

export module ReportStatus {
    export var New = "New";
    export var Returned = "Returned";
    export var Approved = "Approved";
    export var ForApproval = "For Approval";
}
