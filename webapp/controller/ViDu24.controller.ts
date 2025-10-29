import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type NavigationList from "sap/tnt/NavigationList";
import type NavigationListItem from "sap/tnt/NavigationListItem";

export default class ViDu24 extends Controller {
  public override onInit(): void {}

  public onCollapseExpandPress(): void {
    const navigationList = this.byId("navigationList") as NavigationList;
    const expanded = navigationList.getExpanded();
    navigationList.setExpanded(!expanded);
  }

  public onHideShowSubItemPress(): void {
    const subItemThree = this.byId("subItemThree") as NavigationListItem;
    subItemThree.setVisible(!subItemThree.getVisible());
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
