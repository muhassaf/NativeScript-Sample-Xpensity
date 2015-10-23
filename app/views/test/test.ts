import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { ItemEventData } from "ui/list-view";


class ViewModel extends Observable {
    private _selectedItem: Observable;
    private _items: Observable[];

    constructor() {
        super();

        var item1 = new Observable();
        item1.set("value", "Item 1");
        
        var item2 = new Observable();
        item2.set("value", "Item 2");

        this._items = [item1, item2];
    }

    public get items(): Observable[] {
        return this._items;
    }

    public selectItem(item: any) {
        if (this._selectedItem) {
            this._selectedItem.set("isSelected", false);
        }

        this._selectedItem = item;

        if (this._selectedItem) {
            this._selectedItem.set("isSelected", true);
        }
    }
}

var viewModel: ViewModel;
export function onNavigatedTo(args: EventData) {
    var page = <Page>args.object;
    viewModel = new ViewModel();
    page.bindingContext = viewModel;
} 

export function onItemTap(args: ItemEventData) {
    viewModel.selectItem(args.view.bindingContext);
}