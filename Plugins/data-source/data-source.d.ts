declare module "data-source" {

    import { Observable, EventData } from "data/observable";
    import { ObservableArray } from "data/observable-array";

    export class DataSourceOptions {
        public typeName: string;
        public fields: any;
        public expand: any;
        public extendFunc: (item: any) => any;

        constructor(json?: any);
    }

    export class DataSource extends ObservableArray<any> {
        constructor(everlive: any, options: DataSourceOptions);

        public reload(): Promise<any>;
        public sum(property: string);
        public clear();
        public clearFilterDescriptors();
        public clearSortDescriptors();
        public addFilterDescriptor(filterDescriptor: FilterDescriptorBase);
        public addSortDescriptor(sortDescriptor: SortDescriptorBase);
        public groupBy(property: string, groupingFunc?: (item) => any): GroupDescriptor[];
    }

    export class GroupDescriptor extends Observable {
        public header: any;
        public items: any[];
    }

    export class FilterDescriptorBase extends Observable {
        public isEmpty(): boolean;
        public build(): any;
    }

    export class FilterDescriptor extends FilterDescriptorBase  {
        constructor(property: string, operator: number, value: string);

        public property(): string;
        public operator(): number;
        public value(): string;
        public build(): any;
    }

    export class SortDescriptorBase extends Observable {
        public order(query: any): any;
    }

    export class SortDescriptor extends SortDescriptorBase {
        constructor(property: string, direction: string);

        public property(): string;
        public direction(): string;

        public order(query: any): any;
    }

    export module Operators {
        export var equals: number;
        export var startsWith: number;
    }

    export module SortDirection {
        export var ascending: string;
        export var descending: string;
    }
}