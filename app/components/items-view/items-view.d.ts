declare module "items-view" {
    import dependencyObservableModule = require("ui/core/dependency-observable");

    class ItemsView {
        public static itemsProperty: dependencyObservableModule.Property;

        items: any;

        refresh();
    }
}