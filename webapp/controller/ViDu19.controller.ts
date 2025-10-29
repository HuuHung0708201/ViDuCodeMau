import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type Menu from "sap/m/Menu";
import type Button from "sap/m/Button";
import Fragment from "sap/ui/core/Fragment";

export default class ViDu19 extends Controller {
  private _menuFragment?: Menu;

  public override onInit(): void {}

  public async onPress(): Promise<void> {
    const view = this.getView();
    const button = view?.byId("button1") as Button;

    if (!this._menuFragment) {
      // 🧩 Tải fragment lần đầu
      this._menuFragment = (await Fragment.load({
        id: view?.getId(),
        name: "base/fragment/ViDu19",
        controller: this,
      })) as Menu;

      this._menuFragment?.openBy(button, false);
    } else if (this._menuFragment.isOpen()) {
      this._menuFragment.close();
    } else {
      this._menuFragment.openBy(button, false);
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
