var applicationModule = require("application");
var specialPropertiesModule = require("ui/builder/special-properties");
var enums_1 = require("ui/enums");
var viewsModule = require("views");
var navigationModule = require("navigation");
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
specialPropertiesModule.registerSpecialProperty("link", function (instance, propertyValue) {
    instance.on("tap", function (args) {
        navigationModule.navigateById(propertyValue, instance.linkContext);
    });
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
    }
};
//applicationModule.onLaunch = function (context: any) {
//    serviceModule.service.isLoggedIn().then((isLoggedIn) => {
//        var view = isLoggedIn ? viewsModule.home : viewsModule.login;
//        navigationModule.replace(view);
//    });
//}
applicationModule.mainModule = viewsModule.login;
applicationModule.start();
//# sourceMappingURL=app.js.map