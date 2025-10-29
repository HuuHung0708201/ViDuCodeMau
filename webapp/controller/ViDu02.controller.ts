import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type Event from "sap/ui/base/Event";
import type Button from "sap/m/Button";
import type ActionSheet from "sap/m/ActionSheet";
import MessageToast from "sap/m/MessageToast";

export default class ViDu02 extends Controller {
  public override onInit(): void {}

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

  /* 🟦 Gọi khi hộp thoại "Save As Tile" được mở
   */
  public onSaveAsTileOpen(): void {
    MessageToast.show("SaveAsTile Dialog was opened", { duration: 3000 });
  }

  /**
   * 🟩 Gọi khi hộp thoại "Save As Tile" được đóng
   */
  public onSaveAsTileClose(): void {
    MessageToast.show("SaveAsTile Dialog was closed", { duration: 3000 });
  }
}
