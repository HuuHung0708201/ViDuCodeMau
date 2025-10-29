import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import Button from "sap/m/Button";
import Fragment from "sap/ui/core/Fragment";
import type Control from "sap/ui/core/Control";
import MessageToast from "sap/m/MessageToast";
import type MenuItem from "sap/m/MenuItem";
import type Menu from "sap/ui/unified/Menu";
import Popup from "sap/ui/core/Popup";

export default class ViDu20 extends Controller {
  private _menu?: Menu;
  private _keyboard = false;

  public override onInit(): void {
    const openMenuBtn = this.byId("openMenu") as Button;
    // Gắn sự kiện bàn phím
    openMenuBtn.attachBrowserEvent("tab keyup", (event: KeyboardEvent & any) => {
      this._keyboard = event.type === "keyup";
    });
  }

  public handlePressOpenMenu(event: any): void {
    const button = event.getSource() as Button;

    if (!this._menu) {
      Fragment.load({
        name: "base/fragment/ViDu20",
        controller: this,
      }).then((control: Control | Control[]) => {
        // u:Menu trả về control, cast thành sap.ui.unified.Menu
        const menu = control as Menu;
        this._menu = menu;
        this.getView()?.addDependent(this._menu);

        // Mở menu: dùng open của u:Menu
        this._menu.open(this._keyboard, button, Popup.Dock.BeginTop, Popup.Dock.BeginBottom, button);
      });
    } else {
      this._menu.open(this._keyboard, button, Popup.Dock.BeginTop, Popup.Dock.BeginBottom, button);
    }
  }

  public handleMenuItemPress(event: Event): void {
    const item = (event as any).getParameter("item") as MenuItem;
    MessageToast.show(`'${item.getText()}' pressed`);
  }

  public handleTextFieldItemPress(event: Event): void {
    const item = (event as any).getParameter("item") as any;
    MessageToast.show(`'${item.getValue?.() ?? ""}' entered`);
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
