import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import type OverflowToolbar from "sap/m/OverflowToolbar";

export default class ViDu09 extends Controller {
  public override onInit(): void {
    const viewModel = new JSONModel({
      viewPortPercentWidth: 100,
    });

    this.getView()?.setModel(viewModel);
  }

  public onSliderMoved(): void {
  const oModel = this.getView()?.getModel() as JSONModel;
  const iValue = oModel.getProperty("/viewPortPercentWidth");

  for (let i = 1; i <= 10; i++) {
    // Ép kiểu rõ ràng sang OverflowToolbar
    const toolbar = this.byId(`otb${i}`) as OverflowToolbar | undefined;
    toolbar?.setWidth(`${iValue}%`);
  }
}

  public shareAction(): void {
    MessageToast.show("Share action\n".repeat(42));
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
