declare module "view-model-base" {
    import { Observable } from "data/observable";

    export class ViewModelBase extends Observable {
        public isLoading: boolean;
        public isValidationSummaryVisible: boolean
        public errorMessage: string;

        public beginLoading();
        public endLoading();
        public execute<T>(promise: Promise<T>): Promise<T>;
        public setErrorMessage(message: string);
        public showValidationSummary(message: string);
        public hideValidationSummary();
        public validate(): boolean;
        public clear();
    }
} 