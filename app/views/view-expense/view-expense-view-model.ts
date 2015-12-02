import { ViewModelBase } from "view-model-base";
import { service } from "../../data/service";

export class ViewExpenseViewModel extends ViewModelBase {
    private _expense: any;
    private _pictureUrl: string;

    constructor(expense: any) {
        super();

        this._expense = expense;
        this.refresh();
    }

    public get expense(): any {
        return this._expense;
    }

    public get pictureUrl(): string {
        return this._pictureUrl;
    }

    public set pictureUrl(value: string) {
        if (this._pictureUrl !== value) {
            this._pictureUrl = value;
            this.notifyPropertyChange("pictureUrl", value);
        }
    }

    public refresh() {
        if (this._expense.Picture) {
            this.execute(service.getUrlFromFileId(this._expense.Picture))
                .then((url) => {
                    this.pictureUrl = url;
                });
        }
    }
}