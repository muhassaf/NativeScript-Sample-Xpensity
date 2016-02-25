"use strict";
var view_model_base_1 = require("view-model-base");
var service_1 = require("../../data/service");
var ViewExpenseViewModel = (function (_super) {
    __extends(ViewExpenseViewModel, _super);
    function ViewExpenseViewModel(expense) {
        _super.call(this);
        this._expense = expense;
        this.refresh();
    }
    Object.defineProperty(ViewExpenseViewModel.prototype, "expense", {
        get: function () {
            return this._expense;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewExpenseViewModel.prototype, "pictureUrl", {
        get: function () {
            return this._pictureUrl;
        },
        set: function (value) {
            if (this._pictureUrl !== value) {
                this._pictureUrl = value;
                this.notifyPropertyChange("pictureUrl", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewExpenseViewModel.prototype.refresh = function () {
        var _this = this;
        if (this._expense.Picture) {
            this.execute(service_1.service.getUrlFromFileId(this._expense.Picture))
                .then(function (url) {
                _this.pictureUrl = url;
            });
        }
    };
    return ViewExpenseViewModel;
}(view_model_base_1.ViewModelBase));
exports.ViewExpenseViewModel = ViewExpenseViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1leHBlbnNlLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aWV3LWV4cGVuc2Utdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0NBQThCLGlCQUFpQixDQUFDLENBQUE7QUFDaEQsd0JBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFFN0M7SUFBMEMsd0NBQWE7SUFJbkQsOEJBQVksT0FBWTtRQUNwQixpQkFBTyxDQUFDO1FBRVIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxzQkFBVyx5Q0FBTzthQUFsQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNENBQVU7YUFBckI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDO2FBRUQsVUFBc0IsS0FBYTtZQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25ELENBQUM7UUFDTCxDQUFDOzs7T0FQQTtJQVNNLHNDQUFPLEdBQWQ7UUFBQSxpQkFPQztRQU5HLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDeEQsSUFBSSxDQUFDLFVBQUMsR0FBRztnQkFDTixLQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDTCxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDLEFBbENELENBQTBDLCtCQUFhLEdBa0N0RDtBQWxDWSw0QkFBb0IsdUJBa0NoQyxDQUFBIn0=