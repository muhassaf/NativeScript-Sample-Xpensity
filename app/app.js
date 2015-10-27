var applicationModule = require("application");
var specialPropertiesModule = require("ui/builder/special-properties");
var enums_1 = require("ui/enums");
var list_view_1 = require("ui/list-view");
var viewsModule = require("./shared/views");
var navigationModule = require("navigation");
var constants_1 = require("./shared/constants");
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
specialPropertiesModule.registerSpecialProperty("link", function (instance, propertyValue) {
    if (instance instanceof list_view_1.ListView) {
        var listView = instance;
        listView.on("itemTap", function (args) {
            navigationModule.navigateById(propertyValue, {
                item: args.view.bindingContext,
                context: instance.linkContext
            });
        });
    }
    else {
        instance.on("tap", function (args) {
            navigationModule.navigateById(propertyValue, {
                context: instance.linkContext
            });
        });
    }
});
applicationModule.cssFile = "./app.css";
applicationModule.resources = {
    formatDate: function (date) {
        return (date.getDate()) + " " + months[date.getMonth()] + ", " + date.getFullYear();
    },
    formatCurrency: function (currency) {
        return "$" + (Math.round(currency * 100) / 100).toFixed(2);
    },
    visibilityConverter: function (visible) {
        var result = visible ? enums_1.Visibility.visible : enums_1.Visibility.collapse;
        return result;
    },
    reportStatusConverter: function (status) {
        switch (status) {
            case constants_1.reportStatus.approved:
                return "Approved";
            case constants_1.reportStatus.rejected:
                return "Rejected";
            case constants_1.reportStatus.inProgress:
                return "In Progress";
            case constants_1.reportStatus.returned:
                return "Returned";
            case constants_1.reportStatus.submitted:
                return "Submitted";
            default:
                return "";
        }
    },
    editReportVisibilityConverter: function (status) {
        if (status === constants_1.reportStatus.inProgress ||
            status === constants_1.reportStatus.returned) {
            return enums_1.Visibility.visible;
        }
        return enums_1.Visibility.collapse;
    }
};
applicationModule.onLaunch = function (context) {
    var serviceModule = require("./shared/service");
    serviceModule.service.isLoggedIn().then(function (isLoggedIn) {
        var view = isLoggedIn ? viewsModule.main : viewsModule.login;
        navigationModule.replace(view);
    });
};
applicationModule.mainModule = viewsModule.test;
applicationModule.start();
//# sourceMappingURL=app.js.map