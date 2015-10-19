import { ViewModelBase } from "view-model-base";

//import observableModule = require("data/observable");

//import enumsModule = require("ui/enums");

//import viewExpenseViewModelModule = require("./view-expense-view-model");
//import editExpenseViewModelModule = require("../edit-expense/edit-expense-view-model");
//import editReportViewModelModule = require("../edit-report/edit-report-view-model");

//import viewModelBaseModule = require("../view-model-base");
//import serviceModule = require("../../utils/service");
//import navigationModule = require("../../utils/navigation");
//import viewsModule = require("../../utils/views");
//import notificationsModule = require("../../utils/notifications");
//import reportStatusModule = require("../../utils/report-status");

export class ViewReportViewModel extends ViewModelBase {
    private _report: any;
    private _totalCost: number;
    private _expenses: any[];
    private _expensesByCategory: any[];

    constructor(report: any) {
        super();

        this._report = report;
        this._totalCost = 1500;
        this._expenses = [{
            Title: "Item 1",
            Date: new Date(),
            Location: "Sofia, Bulgaria",
            Cost: 100
        }, {
                Title: "Item 1",
                Date: new Date(),
                Location: "Sofia, Bulgaria",
                Cost: 100
            }, {
                Title: "Item 1",
                Date: new Date(),
                Location: "Sofia, Bulgaria",
                Cost: 100
            }, {
                Title: "Item 1",
                Date: new Date(),
                Location: "Sofia, Bulgaria",
                Cost: 100
        }];

        this.refresh();
    }

    public get report(): any {
        return this._report;
    }

    public get expensesByCategory(): any[] {
        return this._expensesByCategory;
    }

    public set expensesByCategory(value: any[]) {
        if (this._expensesByCategory !== value) {
            this._expensesByCategory = value;
            this.notifyPropertyChange("expensesByCategory", value);
        }
    }

    public get expenses(): any[] {
        return this._expenses;
    }

    public set expenses(value: any[]) {
        if (this._expenses !== value) {
            this._expenses = value;
            this.notifyPropertyChange("expenses", value);
        }
    }

    public get totalCost(): number {
        return this._totalCost;
    }

    public set totalCost(value: number) {
        if (this._totalCost !== value) {
            this._totalCost = value;
            this.notifyPropertyChange("totalCost", value);
        }
    }

    public get canAddExpense(): boolean {
        return true;
        //if (this.report.Status === reportStatusModule.ForApproval ||
        //    this.report.Status === reportStatusModule.Approved) {

        //    return enumsModule.Visibility.collapsed;
        //}

        //return this.androidVisibility;
    }

    //public showReportInfo() {
    //    notificationsModule.showInfo(this.report.Info);
    //}

    //submit() {
    //    notificationsModule.confirm("Submit report", "Do you want to submit the report?").then((value: boolean) => {
    //        if (value) {
    //            this.beginLoading();
    //            this.report.Status = reportStatusModule.ForApproval;
    //            serviceModule.service.updateReport(this.report).then((data) => {
    //                navigationModule.goBack();
    //                this.endLoading();
    //            }, error => {
    //                    this.endLoading();
    //                });
    //        }
    //    });
    //}

    //edit() {
    //    navigationModule.navigate({
    //        moduleName: viewsModule.Views.editReport,
    //        context: new editReportViewModelModule.EditReportViewModel(this.report)
    //    });
    //}

    //addExpense() {
    //    navigationModule.navigate({
    //        moduleName: viewsModule.Views.editExpense,
    //        context: new editExpenseViewModelModule.EditExpenseViewModel(this.report)
    //    });
    //}

    //editExpense(expense: any) {
    //    navigationModule.navigate({
    //        moduleName: viewsModule.Views.editExpense,
    //        context: new editExpenseViewModelModule.EditExpenseViewModel(this.report, expense)
    //    });
    //}

    public refresh() {
        //this.loadExpenses();
    }

    //private loadExpenses() {
    //    this.beginLoading();
    //    serviceModule.service.getExpenses(this.report).then((data) => {
    //        var expenses = new Array<viewExpenseViewModelModule.ViewExpenseViewModel>();
    //        for (var i = 0; i < data.length; i++) {
    //            expenses.push(new viewExpenseViewModelModule.ViewExpenseViewModel(data[i]));
    //        }

    //        this.expenses = expenses;
    //        this.loadExpensesByCategory();
    //        this.endLoading();
    //    },(error) => {
    //            this.endLoading();
    //        });
    //}

    //private loadExpensesByCategory() {
    //    if (this.expenses) {
    //        this.beginLoading();
    //        serviceModule.service.getExpenseCategories().then(categories => {
    //            var expenses = {};
    //            var totalCost = 0;
    //            for (var i = 0; i < this.expenses.length; i++) {
    //                var expense = this.expenses[i].expense;
    //                if (expense.Cost && !isNaN(expense.Cost)) {
    //                    if (!expenses[expense.Category]) {
    //                        expenses[expense.Category] = 0;
    //                    }

    //                    expenses[expense.Category] += (+expense.Cost)
    //                    totalCost += (+expense.Cost);
    //                }
    //            }

    //            var expensesByCategory = [];
    //            for (var i = 0; i < categories.length; i++) {
    //                var category = categories[i];
    //                if (expenses[category.Id]) {
    //                    expensesByCategory.push({ Category: category.Title, Percent: getPercent(totalCost, expenses[category.Id]), Color: category.Color });
    //                }
    //            }

    //            this.expensesByCategory = expensesByCategory;
    //            this.totalCost = totalCost;

    //            this.endLoading();
    //        },(error) => {
    //                this.endLoading();
    //            });
    //    }
    //}
}

function getPercent(totalCost: number, cost: number): number {
    return (cost / totalCost) * 100;
}