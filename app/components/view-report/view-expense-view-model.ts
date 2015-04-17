import viewModelBaseModule = require("../view-model-base");
import serviceModule = require("../../utils/service");

export class ViewExpenseViewModel extends viewModelBaseModule.ViewModelBase {
    private _expense: any;
    private _categoryColor: string;

    constructor(expense: any) {
        super();
        this._expense = expense;

        this.loadCategoryColor();
    }

    get expense(): any {
        return this._expense;
    }

    get categoryColor(): string {
        return this._categoryColor;
    }

    set categoryColor(value: string) {
        if (this._categoryColor !== value) {
            this._categoryColor = value;
            this.notifyPropertyChanged("categoryColor", value);
        }
    }

    private loadCategoryColor() {
        serviceModule.service.getColorByExpenseCategory(this.expense.Category).then((color) => {
            this.categoryColor = color;
        });
    }
} 