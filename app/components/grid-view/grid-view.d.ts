declare module "grid-view" {
    import observableModule = require("data/observable");
    import dependencyObservableModule = require("ui/core/dependency-observable");

    export class GridView {
        public static itemsProperty: dependencyObservableModule.Property;

        public static itemTemplateProperty: dependencyObservableModule.Property;

        public static gridColumnsProperty: dependencyObservableModule.Property;

        items: any;

        itemTemplate: string;

        gridColumns: number
    }
} 