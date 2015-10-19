import { ViewModelBase } from "view-model-base";

export class NotificationsViewModel extends ViewModelBase {
    private _reportsForApproval: number;
    private _notifications: any[];

    constructor() {
        super();

        this._reportsForApproval = 0;
        this._notifications = [{
            Message: "Boston trip report has been approved",
            Date: new Date()
        }, {
                Message: "Boston trip report has been approved",
                Date: new Date()
            }];
    }

    public get reportsForApproval(): number {
        return this._reportsForApproval;
    }

    public set reportsForApproval(value: number) {
        if (this._reportsForApproval !== value) {
            this._reportsForApproval = value;
            this.notifyPropertyChange("reportsForApproval", value);
        }
    }

    public get notifications(): any[] {
        return this._notifications;
    }

    refresh() {
        //this.beginLoading();
        //serviceModule.service.getReportsForApproval().then(reportsForApproval => {
        //    this.reportsForApproval = reportsForApproval;
        //    this.endLoading();
        //}, error => {
        //        this.endLoading();
        //    });
    }
}