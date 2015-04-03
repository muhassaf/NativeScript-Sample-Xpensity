declare module "ui/items-view" {
    import viewModule = require("ui/core/view");
    import dependencyObservableModule = require("ui/core/dependency-observable");

    export class ItemsView extends viewModule.View {
        public static itemsProperty: dependencyObservableModule.Property;

        items: any;

        refresh();
    }
}