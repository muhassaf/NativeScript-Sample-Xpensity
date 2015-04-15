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
    private _totalCost: number;
    private _expenses: any[];
    private _expensesByCategory;

    constructor(report: any) {
        super();

        this.report = report;
        this.refresh();
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
        return this._expensesByCategory;
    }

    set expensesByCategory(value: any[]) {
        if (this._expensesByCategory !== value) {
            this._expensesByCategory = value;
            this.notifyPropertyChanged("expensesByCategory", value);
        }
    }

    get expenses(): any[]{
        return this._expenses;
    }

    set expenses(value: any[]) {
        if (this._expenses !== value) {
            this._expenses = value;
            this.notifyPropertyChanged("expenses", value);
        }
    }

    get totalCost(): number {
        return this._totalCost;
    }

    set totalCost(value: number) { 
        if (this._totalCost !== value) {
            this._totalCost = value;
            this.notifyPropertyChanged("totalCost", value);
        }
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
        this.loadExpenses();
    }

    private loadExpenses() {
        this.beginLoading();
        serviceModule.service.getExpenses(this.report).then((data) => {
            this.expenses = data;
            this.loadExpensesByCategory();
            this.endLoading();
        },(error) => {
                this.endLoading();
            });
    }

    private loadExpensesByCategory() {
        if (this.expenses) {
            this.beginLoading();
            serviceModule.service.getExpenseCategories().then(categories => {
                var expenses = {};
                var totalCost = 0;
                for (var i = 0; i < this.expenses.length; i++) {
                    var expense = this.expenses[i];
                    if (expense.Cost && !isNaN(expense.Cost)) {
                        if (!expenses[expense.Category]) {
                            expenses[expense.Category] = 0;
                        }

                        expenses[expense.Category] += (+expense.Cost)
                        totalCost += (+expense.Cost);
                    }
                }

                var expensesByCategory = [];
                for (var i = 0; i < categories.length; i++) {
                    var category = categories[i];
                    if (expenses[category.Id]) {
                        expensesByCategory.push({ Category: category.Title, TotalCost: expenses[category.Id] });
                    }
                }

                this.expensesByCategory = expensesByCategory;
                this.totalCost = totalCost;

                this.endLoading();
            },(error) => {
                    this.endLoading();
                });
        }
    }
}