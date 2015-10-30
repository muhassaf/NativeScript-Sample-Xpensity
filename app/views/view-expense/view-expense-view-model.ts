import { ViewModelBase } from "view-model-base";

export class ViewExpenseViewModel extends ViewModelBase {
    private _expense: any;

    constructor(expense: any) {
        super();

        this._expense = expense;
    }

    public get expense(): any {
        return this._expense;
    }
}