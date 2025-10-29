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
import type Control from "sap/ui/core/Control";
import MenuItem from "sap/m/MenuItem";
import type ToggleButton from "sap/m/ToggleButton";
import type ListBinding from "sap/ui/model/ListBinding";

export default class ViDu25 extends Controller {
  private grouped = false;
  private descending = false;
  private searchQuery: string | number = 0;

  public override onInit(): void {
    const oModel = new JSONModel(sap.ui.require.toUrl("base/localService/ViDu25.json"));
    this.getView()?.setModel(oModel);
    this.grouped = false;
    this.descending = false;
    this.searchQuery = 0;
  }

  public onSliderMoved(oEvent: Event & { getParameter: (param: string) => any }): void {
    const iValue = oEvent.getParameter("value");
    (this.byId("otbSubheader") as any).setWidth(`${iValue}%`);
    (this.byId("otbFooter") as any).setWidth(`${iValue}%`);
  }

  private _fnGroup(oContext: any): { key: string; text: string } {
    const sSupplierName = oContext.getProperty("SupplierName");
    return {
      key: sSupplierName,
      text: sSupplierName,
    };
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

  public onFilter(oEvent: Event & { getSource: () => any }): void {
    this.searchQuery = oEvent.getSource().getValue();
    this.fnApplyFiltersAndOrdering();
  }

  public onTogglePress(oEvent: Event & { getSource: () => ToggleButton }): void {
    const button = oEvent.getSource();
    const pressedState = button.getPressed();
    const stateText = pressedState ? "Pressed" : "Unpressed";
    MessageToast.show(`${button.getId()} ${stateText}`);
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
      const oFilter = new Filter("Name", FilterOperator.Contains, this.searchQuery);
      aFilters.push(oFilter);
    }

    const oTable = this.byId("idProductsTable") as Table;
    const oBinding = oTable.getBinding("items") as ListBinding | null;
    if (oBinding) {
      oBinding.filter(aFilters);
      oBinding.sort(aSorters);
    }
  }

  public onDefaultActionAccept(): void {
    MessageToast.show("Default action triggered");
  }

  public onBeforeMenuOpen(): void {
    MessageToast.show("beforeMenuOpen is fired");
  }

  public onPress(oEvent: Event & { getSource: () => Control }): void {
    MessageToast.show(`${oEvent.getSource().getId()} Pressed`);
  }

  public onMenuAction(oEvent: Event & { getParameter: (param: string) => any }): void {
    let oItem = oEvent.getParameter("item") as MenuItem;
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

    MessageToast.show(`Action triggered on item: ${sItemPath}`);
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
