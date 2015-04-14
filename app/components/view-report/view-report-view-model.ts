import observableModule = require("data/observable");

import enumsModule = require("ui/enums");

import editExpenseViewModelModule = require("../edit-expense/edit-expense-view-model");
import editReportViewModelModule = require("../edit-report/edit-report-view-model");

import viewModelBaseModule = require("../view-model-base");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import notificationsModule = require("../../utils/notifications");
import reportStatusModule = require("../../utils/report-status");

export class ViewReportViewModel extends viewModelBaseModule.ViewModelBase {
    private _report: any;
    private _status: string;
    private _expenses: any[];
    private _expensesLoaded: boolean;

    constructor(report: any) {
        super();

        this.report = report;
        this._expensesLoaded = false;
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
        this.loadExpenses();

        return this._expenses;
    }

    set expenses(value: any[]) {
        if (this._expenses !== value) {
            this._expenses = value;
            this.notifyPropertyChanged("expenses", value);
        }
    }

    get total(): number {
        return 1500;
    }

    get fabVisibility() {
        if (this.report.status === reportStatusModule.ForApproval ||
            this.report.status === reportStatusModule.Approved) {
            return enumsModule.Visibility.collapsed;
        }
    }

    showReportInfo() {
        notificationsModule.showInfo(this.report.Info);
    }

    submit(): Promise<any> {
        return new Promise<any>((resolve) => {
            this.beginLoading();
            this.report.Status = reportStatusModule.ForApproval;
            serviceModule.service.updateReport(this.report).then((data) => {
                this.notifyPropertyChanged("fapVisibility", false);
                this.endLoading();
                resolve(data)
            }, error => {
                    this.endLoading();
                });
        });
    }

    edit() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editReport,
            context: new editReportViewModelModule.EditReportViewModel(this.report)
        });
    }

    addExpense() {
        console.log("OUTER REPORT: " + JSON.stringify(this.report));
        navigationModule.navigate({
            moduleName: viewsModule.Views.editExpense,
            context: new editExpenseViewModelModule.EditExpenseViewModel(this.report)
        });
    }

    editExpense(expense: any) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editExpense,
            context: new editExpenseViewModelModule.EditExpenseViewModel(this.report, expense)
        });
    }

    refresh() {
        this.reloadExpenses();
    }

    private loadExpenses() {
        if (!this._expensesLoaded) {
            this.reloadExpenses();
        }
    }

    private reloadExpenses() {
        this.beginLoading();
        serviceModule.service.getExpenses(this.report).then((data) => {
            this.expenses = data;
            this._expensesLoaded = true;
            this.endLoading();
        },(error) => {
                this.endLoading();
            });
    }
}