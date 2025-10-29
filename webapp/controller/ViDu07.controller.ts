import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import MessageToast from "sap/m/MessageToast";

export default class ViDu07 extends Controller {
  public override onInit(): void {
    
  }

  // Hàm xử lý sự kiện press
  public press(evt: Event): void {
    MessageToast.show("The GenericTag is pressed.");
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
