import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type Menu from "sap/m/Menu";
import type Button from "sap/m/Button";
import Fragment from "sap/ui/core/Fragment";
import MessageToast from "sap/m/MessageToast";
import MenuItem from "sap/m/MenuItem";

export default class ViDu17 extends Controller {
  private menuFragment?: Menu;

  public override onInit(): void {
   
  }

  public async onPress(): Promise<void> {
    const view = this.getView();
    const button = view?.byId("button") as Button;

    if (!this.menuFragment) {
      // 🧩 Load fragment nếu chưa có
      this.menuFragment = await Fragment.load({
        id: view?.getId(),
        name: "base/fragment/ViDu17",
        controller: this
      }) as Menu;

      this.menuFragment.openBy(button, false);
    } else if (this.menuFragment.isOpen()) {
      this.menuFragment.close();
    } else {
      this.menuFragment.openBy(button, false);
    }
  }

  public onMenuAction(event: Event): void {
    let item = (event as any).getParameter("item") as MenuItem;
    let sItemPath = "";

    while (item instanceof MenuItem) {
      sItemPath = `${item.getText()} > ${sItemPath}`;
      item = item.getParent() as MenuItem;
    }

    sItemPath = sItemPath.substring(0, sItemPath.lastIndexOf(" > "));

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
