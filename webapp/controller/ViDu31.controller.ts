import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type SideNavigation from "sap/tnt/SideNavigation";
import type { MenuItemBase$SelectEvent } from "sap/ui/unified/MenuItemBase";
import type NavigationListItem from "sap/tnt/NavigationListItem";
import MessageToast from "sap/m/MessageToast";

export default class ViDu31 extends Controller {
  public override onInit(): void {}

  // Xử lý collapse/expand của SideNavigation
  public onCollapseExpandPress(): void {
    const oSideNavigation = this.byId("sideNavigation") as SideNavigation;
    if (!oSideNavigation) return;

    const bExpanded = oSideNavigation.getExpanded();
    oSideNavigation.setExpanded(!bExpanded);
  }

  // Xử lý sự kiện chọn item
  public onItemSelect(oEvent: MenuItemBase$SelectEvent): void {
    const oItem = (oEvent as any).getParameter("item") as NavigationListItem;
    if (!oItem) return;

    const sText = oItem.getText();
    MessageToast.show(`Item selected: ${sText}`);
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
