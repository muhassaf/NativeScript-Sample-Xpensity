declare module "grid-view" {
    import observableModule = require("data/observable");
    import viewModule = require("ui/core/view");
    import dependencyObservableModule = require("ui/core/dependency-observable");

    export class GridView {
        public static itemsProperty: dependencyObservableModule.Property;

        public static itemTemplateProperty: dependencyObservableModule.Property;

        public static gridColumnsProperty: dependencyObservableModule.Property;

        items: any;

        itemTemplate: string;

        gridColumns: number
    }

    export interface ItemEventData extends observableModule.EventData {
        item: any;

        /**
         * The view that is associated to the item, for which the event is raised.
         */
        view: viewModule.View;
    }
} 