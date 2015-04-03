import observableModule = require("data/observable");

import viewModelBaseModule = require("./view-model-base");
import serviceModule = require("../utils/service");

export class ReportViewModel extends viewModelBaseModule.ViewModelBase {
    private _report: any;

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
}