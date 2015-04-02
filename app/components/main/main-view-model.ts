import observableModule = require("data/observable");

import viewModelBaseModule = require("../view-model-base");
import serviceModule = require("../../utils/service");

export class MainViewModel extends viewModelBaseModule.ViewModelBase {
    constructor() {
        super();
    }

    get reports(): any {
        return [
            { Expenses: [1, 2, 2, 3], Title: "Dinner with Daniel Smith", CreatedOn: "Apr 13, 2015" },
            { Expenses: [2, 1, 1], Title: "Lunch with clients", CreatedOn: "Apr 13, 2015" },
            { Expenses: [1, 1, 2, 2, 2], Title: "Boston Trip", CreatedOn: "Mar 14, 2015" },
            { Expenses: [1, 1, 2, 2, 2], Title: "Boston Trip", CreatedOn: "Jan 18, 2015" },
            { Expenses: [1, 1, 2, 2, 2], Title: "Boston Trip", CreatedOn: "Apr 21, 2015" },
            { Expenses: [1, 1, 2, 2, 2], Title: "Boston Trip", CreatedOn: "Apr 23, 2015" }];
    }
}