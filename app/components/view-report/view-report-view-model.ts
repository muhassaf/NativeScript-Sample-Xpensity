import observableModule = require("data/observable");

import editExpenseViewModelModule = require("../edit-expense/edit-expense-view-model");
import editReportViewModelModule = require("../edit-report/edit-report-view-model");

import viewModelBaseModule = require("../view-model-base");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class ReportViewModel extends viewModelBaseModule.ViewModelBase {
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
            { Title: "Dinner", Cost: 132.33, Date: "May 02, 2015", Location: "Panera Bread, Boston" },
            { Title: "Taxi", Cost: 15.33, Date: "May 02, 2015", Location: "Uber, Boston" },
            { Title: "Hotel", Cost: 340.54, Date: "May 02, 2015", Location: "Grand Hotel Boston, Boston" },
        ];
    }

    get total(): number {
        return 1500;
    }

    addExpense() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editExpense,
            context: new editExpenseViewModelModule.EditExpenseViewModel()
        });
    }

    showReportInfo() {
        this.showInfo(this.report.Info);
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
}

export module ReportStatus {
    export var New = "New";
    export var Returned = "Returned";
    export var Approved = "Approved";
    export var ForApproval = "For Approval";
}
