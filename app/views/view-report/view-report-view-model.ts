import { ViewModelBase } from "view-model-base";
import { EventData, Observable } from "data/observable";
import { DataSource, DataSourceOptions, FilterDescriptor, Operators } from "data-source";

import { service, ExpenseTypeName, everlive } from "../../data/service";
import notificationsModule = require("notifications");
import navigationModule = require("navigation");
import { reportStatus } from "../../shared/constants";
import viewsModule = require("../../shared/views");
import constantsModule = require("../../shared/constants");

export class ViewReportViewModel extends ViewModelBase {
    private _report: any;
    private _totalCost: number;
    private _expenses: DataSource;
    private _expensesByCategory: any[];
    private _categories: Map<any, any>;

    constructor(report: any) {
        super();

        this._report = report;

        var options = new DataSourceOptions();
        options.typeName = ExpenseTypeName;
        options.expand = {
            Category: {
                TargetTypeName: "ExpenseCategory",
                ReturnAs: "ExpenseCategory"
            }
        };

        this._expenses = new DataSource(everlive, options);
        this._expenses.addFilterDescriptor(new FilterDescriptor("Report", Operators.equals, this._report.Id));
        this._expenses.on("loaded", (args: EventData) => {
            this.totalCost = this._expenses.sum("Cost");
            var expensesByCategory = [];
            this._expenses.groupBy("ExpenseCategory", (category) => {
                return category.Id
            }).forEach((group, index, groupDescriptors) => {
                var cost = sum(group.items, "Cost");
                expensesByCategory.push({
                    Category: group.header,
                    Percent: getPercent(this._totalCost, cost)
                });
            });

            this.expensesByCategory = expensesByCategory;
        });
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

    public get expenses(): DataSource {
        return this._expenses;
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

    public submit() {
        notificationsModule.confirm("Submit report", "Do you want to submit the report?")
            .then((value: boolean) => {
                if (value) {
                    this.execute(service.updateReport({
                        Id: this._report.Id,
                        Status: reportStatus.submitted
                    })).then(() => {
                        navigationModule.goBack();
                    })
                }
            });
    }

    public refresh() {
        this.execute(this.expenses.reload());
    }

    public itemTap(item: any) {
        var view = (this._report.Status === reportStatus.inProgress || this._report.Status === reportStatus.returned) ?
            viewsModule.editExpense : viewsModule.viewExpense;

        navigationModule.navigate(view, {
            item: item,
            context: this._report
        });
    }
}

function getPercent(totalCost: number, cost: number): number {
    return (cost / totalCost) * 100;
}

function sum(items: any[], property: string): number {
    var sum = 0;
    items.forEach((item, index, i) => {
        var value = item[property];
        if (!isNaN(value)) {
            sum += +value;
        }
    });

    return sum;
}