import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type DynamicPage from "sap/f/DynamicPage";
import type DynamicPageTitle from "sap/f/DynamicPageTitle";

export default class ViDu13 extends Controller {
  public override onInit(): void {}

  public getPage(): DynamicPage {
    return this.byId("dynamicPageId") as DynamicPage;
  }

  public toggleAreaPriority(): void {
    const title = this.getPage().getTitle() as DynamicPageTitle;
    const defaultShrinkRatio = title?.getMetadata()?.getProperty("areaShrinkRatio")?.defaultValue as string;

    const newShrinkRatio = title.getAreaShrinkRatio() === defaultShrinkRatio ? "1.6:1:1.6" : defaultShrinkRatio;

    title.setAreaShrinkRatio(newShrinkRatio);
  }

  public onToggleFooter(): void {
    const page = this.getPage();
    page.setShowFooter(!page.getShowFooter());
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
