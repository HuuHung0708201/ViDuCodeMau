import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type UnifiedMenu from "sap/ui/unified/Menu";
import type Button from "sap/m/Button";
import Fragment from "sap/ui/core/Fragment";
import type Control from "sap/ui/core/Control";
import Popup from "sap/ui/core/Popup";

export default class ViDu22 extends Controller {
  private _menu?: UnifiedMenu;
  private _keyboard: boolean = false;

  public override onInit(): void {
    const openMenuBtn = this.byId("openMenu") as Button;
    openMenuBtn.attachBrowserEvent("tab keyup", (oEvent: KeyboardEvent & any) => {
      this._keyboard = oEvent.type === "keyup";
    });
  }

  public handlePressOpenMenu(event: any): void {
    const oButton = event.getSource() as Button;

    if (!this._menu) {
      Fragment.load({
        name: "base/fragment/ViDu22",
        controller: this,
      }).then((menuControl: Control | Control[]) => {
        // Type assertion sang UnifiedMenu
        const oMenu = menuControl as UnifiedMenu;
        this._menu = oMenu;
        this.getView()?.addDependent(this._menu);

        // Mở menu bằng Popup
        this._menu.open(this._keyboard, oButton, Popup.Dock.BeginTop, Popup.Dock.BeginBottom, oButton);
      });
    } else {
      this._menu.open(this._keyboard, oButton, Popup.Dock.BeginTop, Popup.Dock.BeginBottom, oButton);
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
