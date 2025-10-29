import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";

export default class ViDu11 extends Controller {
  public override onInit(): void {
    
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
