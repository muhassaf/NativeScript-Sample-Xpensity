declare module "edit-view-model-base" {
    import { ViewModelBase } from "view-model-base";

    export class EditViewModelBase extends ViewModelBase {
        constructor(item: any, properties: string[])

        public item: any;

        public save();
        protected createItem();
        protected onItemAdded(item: any);
        protected onItemUpdated(item: any);
        protected onItemDeleted(item: any);
        protected onSaving(item: any): Promise<boolean>;
    }
} 