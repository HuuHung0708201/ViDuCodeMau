import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import * as library from "sap/m/library";
import * as Formatter from "../formatters/Formatter";
import JSONModel from "sap/ui/model/json/JSONModel";

const { PopinLayout } = library;

export default class ViDu12 extends Controller {
  public formatter = Formatter;
  public override onInit(): void {
    const oModel = new JSONModel(sap.ui.require.toUrl("base/localService/ViDu12.json"));
    this.getView()?.setModel(oModel);
  }

  public onPopinLayoutChanged(): void {
    const oTable = this.byId("idProductsTable") as any;
    const oComboBox = this.byId("idPopinLayout") as any;
    const sPopinLayout = oComboBox.getSelectedKey();

    switch (sPopinLayout) {
      case "Block":
        oTable.setPopinLayout(PopinLayout.Block);
        break;
      case "GridLarge":
        oTable.setPopinLayout(PopinLayout.GridLarge);
        break;
      case "GridSmall":
        oTable.setPopinLayout(PopinLayout.GridSmall);
        break;
      default:
        oTable.setPopinLayout(PopinLayout.Block);
        break;
    }
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
