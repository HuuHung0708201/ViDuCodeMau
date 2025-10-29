import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";

export default class ViDu15 extends Controller {
  public override onInit(): void {
    const oModel = new JSONModel(
      sap.ui.require.toUrl("base/localService/ViDu15.json")
    );

    this.getView()?.setModel(oModel);
  }

  public handleLinkPress(): void {
    MessageBox.alert("Link was clicked!");
  }

  public handleObjectIdentifierPress(): void {
    MessageBox.alert("Object Identifier was clicked!");
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
