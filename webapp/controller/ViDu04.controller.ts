import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import MessageToast from "sap/m/MessageToast";

// 🧱 Lấy enum BreadcrumbsSeparatorStyle từ thư viện sap.m

export default class ViDu04 extends Controller {
  public override onInit(): void {}

  public onPress(evt: Event): void {
    const source = (evt as any).getSource();
    const buttonId = source.getId();
    MessageToast.show(`${buttonId} Pressed`);
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
