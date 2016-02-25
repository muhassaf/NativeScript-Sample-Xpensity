"use strict";
var applicationModule = require("application");
var specialPropertiesModule = require("ui/builder/special-properties");
var enums_1 = require("ui/enums");
var list_view_1 = require("ui/list-view");
var viewsModule = require("./shared/views");
var navigationModule = require("navigation");
var constants_1 = require("./shared/constants");
var chartModule = require("nativescript-telerik-ui/chart");
var listViewModule = require("nativescript-telerik-ui/listview");
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
    else if (instance instanceof listViewModule.RadListView) {
        instance.on("itemSelected", function (args) {
            navigationModule.navigateById(propertyValue, {
                item: instance.getSelectedItems()[0],
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
        return visible ? enums_1.Visibility.visible : enums_1.Visibility.collapse;
    },
    reverseVisibilityConverter: function (visible) {
        return !visible ? enums_1.Visibility.visible : enums_1.Visibility.collapse;
    },
    tabVisibilityConverter: function (tabIndex, index) {
        return tabIndex === index ? enums_1.Visibility.visible : enums_1.Visibility.collapse;
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
    },
    titleConverter: function (tab) {
        switch (tab) {
            case 0:
                return "Reports";
            case 1:
                return "Notifications";
            case 2:
                return "Settings";
            default:
                return "";
        }
    },
    paletteConverter: function (expensesByCategory) {
        var palette = new chartModule.Palette();
        var paletteEntries = [];
        expensesByCategory.forEach(function (item) {
            var entry = new chartModule.PaletteEntry();
            entry.fillColor = item.Category.Color;
            paletteEntries.push(entry);
        });
        palette.entries = paletteEntries;
        return [palette];
    }
};
applicationModule.onLaunch = function (context) {
    var serviceModule = require("./data/service");
    serviceModule.service.isLoggedIn().then(function (isLoggedIn) {
        var view = isLoggedIn ? viewsModule.main : viewsModule.login;
        navigationModule.replace(view);
    });
};
applicationModule.mainModule = viewsModule.initial;
applicationModule.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFPLGlCQUFpQixXQUFXLGFBQWEsQ0FBQyxDQUFDO0FBRWxELElBQU8sdUJBQXVCLFdBQVcsK0JBQStCLENBQUMsQ0FBQztBQUMxRSxzQkFBMkIsVUFBVSxDQUFDLENBQUE7QUFDdEMsMEJBQXdDLGNBQWMsQ0FBQyxDQUFBO0FBRXZELElBQU8sV0FBVyxXQUFXLGdCQUFnQixDQUFDLENBQUM7QUFDL0MsSUFBTyxnQkFBZ0IsV0FBVyxZQUFZLENBQUMsQ0FBQztBQUNoRCwwQkFBNkIsb0JBQW9CLENBQUMsQ0FBQTtBQUdsRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUMzRCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUVqRSxJQUFJLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDeEksdUJBQXVCLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLFVBQUMsUUFBUSxFQUFFLGFBQWE7SUFDNUUsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLG9CQUFRLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFhLFFBQVEsQ0FBQztRQUNsQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFDLElBQW1CO1lBQ3ZDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3pDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWM7Z0JBQzlCLE9BQU8sRUFBUSxRQUFTLENBQUMsV0FBVzthQUN2QyxDQUFDLENBQUM7UUFDUCxD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