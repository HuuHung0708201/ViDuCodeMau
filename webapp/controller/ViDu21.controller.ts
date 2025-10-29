import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type Menu from "sap/ui/unified/Menu";
import type Button from "sap/m/Button";
import Fragment from "sap/ui/core/Fragment";
import type Control from "sap/ui/core/Control";
import type MenuItem from "sap/ui/unified/MenuItem";
import MessageToast from "sap/m/MessageToast";

export default class ViDu21 extends Controller {
  private _menu?: Menu;
  private _keyboard = false;

  public override onInit(): void {
    const openMenuBtn = this.byId("openMenu") as Button;
    openMenuBtn.attachBrowserEvent("tab keyup", (oEvent: KeyboardEvent & any) => {
      this._keyboard = oEvent.type === "keyup";
    });
  }

  public handlePressOpenMenu(event: any): void {
    const button = event.getSource() as Button;

    if (!this._menu) {
      Fragment.load({
        name: "base/fragment/ViDu21",
        controller: this,
      }).then((control: Control | Control[]) => {
        const menu = control as Menu;
        this._menu = menu;
        this.getView()?.addDependent(this._menu);

        // Khi dùng unified Menu, open phải dùng `open` của Menu
        // Cú pháp: menu.open(bKeyboard, oDomRef, my, at, of)
        this._menu.open(
          this._keyboard,
          button.getDomRef() as HTMLElement,
          "BeginTop",
          "BeginBottom",
          button.getDomRef() as HTMLElement
        );
      });
    } else {
      this._menu.open(
        this._keyboard,
        button.getDomRef() as HTMLElement,
        "BeginTop",
        "BeginBottom",
        button.getDomRef() as HTMLElement
      );
    }
  }

  public handleMenuItemPress(event: any): void {
    const item = event.getParameter("item") as MenuItem;
    let message = "";

    if (item.getSubmenu && item.getSubmenu()) {
      return; // bỏ qua nếu có submenu
    }

    if (item.getMetadata().getName() === "sap.ui.unified.MenuTextFieldItem") {
      message = `'${(item as any).getValue?.() ?? ""}' entered`;
    } else {
      message = `'${item.getText()}' pressed`;
    }

    MessageToast.show(message);
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
