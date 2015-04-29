import applicationSettingsModule = require("application-settings");

import constantsModule = require("./constants");
import notificationsModule = require("./notifications");
import reportStatusModule = require("./report-status");

var everliveModule = require("../lib/everlive");

var REPORT = "Report";
var EXPENSE = "Expense";
var EXPENSE_CATEGORY = "ExpenseCategory";

export class Service {
    private _defaultExpenseCategory: any;
    private _everlive: any;
    private _categories: any[];

    get isAuthenticated(): boolean {
        return applicationSettingsModule.hasKey(constantsModule.authenticationTokenKey);
    }

    login(username: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.login(username, password,(data: any) => {
                this.setupLocalSettings(data.result.access_token);
                resolve(data);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    logout() {
        this.clearLocalSettings();
        this.clearEverlive();
    }

    signUp(username: string, password: string, additionalData: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.register(username, password, additionalData, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    getCurrentUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.Users.currentUser().then((data) => {
                resolve(data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    getReports(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(REPORT).get().then(data => {
                resolve(<any[]>data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    getReportsForApproval(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(REPORT).get({ Status: reportStatusModule.ForApproval }).then(data => {
                resolve(<number>data.result.length);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    createReport(report: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(REPORT).create(report, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    updateReport(report: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(REPORT).updateSingle(report, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    deleteReport(report: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(REPORT).destroySingle({ Id: report.Id }, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    getExpenses(report: any): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(EXPENSE).get({ Report: report.Id }).then(data => {
                resolve(<any[]>data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    getExpensesByCategory(report: any): Promise<any> {
        return new Promise<any[]>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(EXPENSE).get().then(data => {
                resolve(<any[]>data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    createExpense(expense: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(EXPENSE).create(expense, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    updateExpense(expense: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(EXPENSE).updateSingle(expense, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    deleteExpense(expense: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(EXPENSE).destroySingle({ Id: expense.Id }, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    getExpenseCategories(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            if (!this._categories) {
                var everlive = this.createEverlive();
                everlive.data(EXPENSE_CATEGORY).get().then(data => {
                    this._categories = <any[]>data.result;
                    resolve(this._categories);
                }, error => {
                        Service.showErrorAndReject(error, reject);
                    })
            }
            else {
                resolve(this._categories);
            }
        });
    }

    getExpenseCategory(categoryId: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(EXPENSE_CATEGORY).getById(categoryId).then(data => {
                resolve(<any>data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    getColorByExpenseCategory(categoryId: string): Promise<string> {
        return new Promise<any>((resolve, reject) => {
            this.getExpenseCategories().then(categories => {
                for (var i = 0; i < categories.length; i++) {
                    var category = categories[i];
                    if (category.Id == categoryId) {
                        resolve(category.Color);

                        break;
                    }
                }
            }, reject);
        });
    }

    clearEverlive() {
        if (this._everlive) {
            //this._everlive.offlineStorage.purgeAll();
            this._everlive = null;
        }
    }

    private createEverlive(): any {
        if (!this._everlive) {
            this._everlive = new everliveModule({
                apiKey: constantsModule.telerikApiKey,
                token: applicationSettingsModule.getString(constantsModule.authenticationTokenKey)
            });
        }

        return this._everlive;
    }

    private static showErrorAndReject(error: any, reject: (e: any) => void) {
        notificationsModule.showError(error.message);
        reject(error);
    }

    private setupLocalSettings(authenticationTokenKey: string) {
        applicationSettingsModule.setString(constantsModule.authenticationTokenKey, authenticationTokenKey);
        applicationSettingsModule.setBoolean(constantsModule.offlineMode, true);
        applicationSettingsModule.setBoolean(constantsModule.notifications, false);
    }

    private clearLocalSettings() {
        applicationSettingsModule.remove(constantsModule.authenticationTokenKey);
        applicationSettingsModule.remove(constantsModule.notifications);
        applicationSettingsModule.remove(constantsModule.offlineMode);
    }
}

export var service = new Service();