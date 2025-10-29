import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type SideNavigation from "sap/tnt/SideNavigation";
import type NavigationListItem from "sap/tnt/NavigationListItem";

export default class ViDu30 extends Controller {
  public override onInit(): void {}

  // Xử lý sự kiện collapse/expand của SideNavigation
  public onCollapseExpandPress(): void {
    const oSideNavigation = this.byId("sideNavigation") as SideNavigation;
    if (!oSideNavigation) return;

    const bExpanded = oSideNavigation.getExpanded();
    oSideNavigation.setExpanded(!bExpanded);
  }

  // Xử lý sự kiện ẩn/hiện NavigationListItem
  public onHideShowWalkedPress(): void {
    const oNavListItem = this.byId("walked") as NavigationListItem;
    if (!oNavListItem) return;

    const bVisible = oNavListItem.getVisible();
    oNavListItem.setVisible(!bVisible);
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
