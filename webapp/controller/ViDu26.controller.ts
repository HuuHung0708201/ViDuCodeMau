import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import JSONModel from "sap/ui/model/json/JSONModel";
import type Button from "sap/m/Button";
import MessageToast from "sap/m/MessageToast";
import Filter from "sap/ui/model/Filter";
import Sorter from "sap/ui/model/Sorter";
import FilterOperator from "sap/ui/model/FilterOperator";
import type Table from "sap/m/Table";
import type ListBinding from "sap/ui/model/ListBinding";
import MenuItem from "sap/m/MenuItem";

export default class ViDu26 extends Controller {
  private grouped: boolean = false;
  private descending: boolean = false;
  private searchQuery: string | number = 0;

  public override onInit(): void {
    const oModel = new JSONModel(sap.ui.require.toUrl("base/localService/ViDu26.json"));
    this.getView()?.setModel(oModel);
  }

  public onSliderMoved(event: Event): void {
    const value = ((event as any).getParameter as any)("value") as number;
    (this.byId("otbSubheader") as any).setWidth(value + "%");
    (this.byId("otbFooter") as any).setWidth(value + "%");
  }

  private _fnGroup(context: any): { key: string; text: string } {
    const supplierName = context.getProperty("SupplierName") as string;
    return { key: supplierName, text: supplierName };
  }

  public onReset(): void {
    this.grouped = false;
    this.descending = false;
    this.searchQuery = 0;
    (this.byId("maxPrice") as any).setValue("");
    this.fnApplyFiltersAndOrdering();
  }

  public onGroup(): void {
    this.grouped = !this.grouped;
    this.fnApplyFiltersAndOrdering();
  }

  public onSort(): void {
    this.descending = !this.descending;
    this.fnApplyFiltersAndOrdering();
  }

  public onFilter(event: Event): void {
    this.searchQuery = ((event as any).getSource() as any).getValue();
    this.fnApplyFiltersAndOrdering();
  }

  private fnApplyFiltersAndOrdering(): void {
    const aFilters: Filter[] = [];
    const aSorters: Sorter[] = [];

    if (this.grouped) {
      aSorters.push(new Sorter("SupplierName", this.descending, this._fnGroup.bind(this)));
    } else {
      aSorters.push(new Sorter("Name", this.descending));
    }

    if (this.searchQuery) {
      aFilters.push(new Filter("Name", FilterOperator.Contains, this.searchQuery));
    }

    const oTable = this.byId("idProductsTable") as Table;
    const oBinding = oTable.getBinding("items") as ListBinding | null;
    if (oBinding) {
      oBinding.filter(aFilters);
      oBinding.sort(aSorters);
    }
  }

  public onTogglePress(event: Event): void {
    const oButton = (event as any).getSource() as Button;
    const bPressedState = (oButton as any).getPressed?.();
    const sStateToDisplay = bPressedState ? "Pressed" : "Unpressed";
    MessageToast.show(oButton.getId() + " " + sStateToDisplay);
  }

  public onDefaultActionAccept(): void {
    MessageToast.show("Default action triggered");
  }

  public onBeforeMenuOpen(): void {
    MessageToast.show("beforeMenuOpen is fired");
  }

  public onPress(oEvent: Event): void {
    const oSource = (oEvent as any).getSource() as any;
    MessageToast.show(oSource.getId() + " Pressed");
  }

  public onMenuAction(oEvent: Event): void {
    let oItem = (oEvent as any).getParameter("item") as MenuItem;
    let sItemPath = "";

    while (oItem instanceof MenuItem) {
      sItemPath = `${oItem.getText()} > ${sItemPath}`;
      const parent = oItem.getParent();
      if (parent instanceof MenuItem) {
        oItem = parent;
      } else {
        break;
      }
    }

    // Loại bỏ ký tự " > " dư thừa ở cuối
    sItemPath = sItemPath.endsWith(" > ") ? sItemPath.slice(0, -3) : sItemPath;

    MessageToast.show("Action triggered on item: " + sItemPath);
  }

  // Hàm quay lại nếu cần
  public onNavBack(): void {
    const history = History.getInstance();
    const previousHash = history.getPreviousHash();

    if (previousHash !== undefined) {
      window.history.go(-1);
    } else {
      const router = UIComponent.getRouterFor(this);
      router.navTo("RouteMain", {}, true);
    }
  }
}
