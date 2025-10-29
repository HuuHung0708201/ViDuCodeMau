import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type Event from "sap/ui/base/Event";
import type Button from "sap/m/Button";
import type ActionSheet from "sap/m/ActionSheet";
import MessageToast from "sap/m/MessageToast";
import * as mobileLibrary from "sap/m/library";
import JSONModel from "sap/ui/model/json/JSONModel";
import BindingMode from "sap/ui/model/BindingMode";
import type Item from "sap/ui/core/Item";
import Popover from "sap/m/Popover";
import DynamicPage from "sap/f/DynamicPage";
import type DynamicPageTitle from "sap/f/DynamicPageTitle";
import type Control from "sap/ui/core/Control";
import Fragment from "sap/ui/core/Fragment";

// 🧱 Lấy enum BreadcrumbsSeparatorStyle từ thư viện sap.m
const { BreadcrumbsSeparatorStyle } = mobileLibrary;

export default class ViDu03 extends Controller {
  // Dynamic Page Freestyle Example Start
  private shrinkRatio: string;
  private popover?: Promise<Popover>;
  // Dynamic Page Freestyle Example Hết

  public override onInit(): void {
    //  Breadcrumbs sample start
    const data: Array<{ key: string; text: string }> = [];
    const model = new JSONModel();
    // Cho phép binding 2 chiều
    model.setDefaultBindingMode(BindingMode.TwoWay);
    // Duyệt qua các kiểu separator có sẵn trong enum
    Object.keys(BreadcrumbsSeparatorStyle).forEach((key) => {
      data.push({
        key: key,
        text: (BreadcrumbsSeparatorStyle as any)[key],
      });
    });
    // Gán dữ liệu vào model
    model.setData({
      items: data,
      selected: data[0].text,
    });
    // Gán model vào View
    this.getView()?.setModel(model);
    //  Breadcrumbs sample Hết

    // Dynamic Page Freestyle Exampl Start
    const modelExampl = new JSONModel();
    modelExampl.loadData(sap.ui.require.toUrl("base/localService/ViDu03.json"));

    // Khi load xong, thêm 2 thuộc tính:
    modelExampl.attachRequestCompleted(() => {
      modelExampl.setProperty("/headerExpanded", true);
      modelExampl.setProperty("/titleClickable", true);
    });

    this.getView()?.setModel(modelExampl, "example");
    this.shrinkRatio = "1:1.6:1.6";
    // Dynamic Page Freestyle Exampl Hết
  }

  //  Breadcrumbs sample Start
  public onPress(event: Event): void {
    const source = event.getSource() as any;
    MessageToast.show(`${source.getText()} has been activated`);
  }

  public onChange(event: any): void {
    const model = this.getView()?.getModel() as JSONModel;
    const selectedItem = event.getParameter("selectedItem")?.getKey?.();
    model.setProperty("/selected", selectedItem);
  }
  //  Breadcrumbs sample Hết

  // Breadcrumbs sample without current page
  public onPressPage(event: Event): void {
    const source = event.getSource() as any;
    const text = source?.getText?.() || "Unknown";
    MessageToast.show(`${text} has been clicked`);
  }

  public onChangePage(event: Event): void {
    const selectedItem = (event as any).getParameter("selectedItem") as Item | undefined;
    const key = selectedItem?.getKey?.();
    const oModel = this.getView()?.getModel() as JSONModel;
    if (oModel && key) {
      oModel.setProperty("/separatorStyle", key);
    }
  }
  // Breadcrumbs sample without current page

  // Breadcrumbs sample with current page link
  public onPressPage01(event: Event): void {
    const source = event.getSource() as Button;
    MessageToast.show(`${source.getText()} has been clicked`);
  }
  // Breadcrumbs sample with current page link Hết

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

  // Dynamic Page Freestyle Example Start
  // 🔹 Lấy đối tượng DynamicPage
  public getPage(): DynamicPage {
    return this.byId("dynamicPageId") as DynamicPage;
  }
  // 🔹 Bật/tắt footer
  public onToggleFooter(): void {
    const page = this.getView()?.byId("dynamicPageId") as DynamicPage;
    if (!page) {
      console.warn("DynamicPage not found");
      return;
    }

    const newState = !page.getShowFooter();
    page.setShowFooter(newState);
    page.invalidate(); // ⚡ bắt DynamicPage re-render
    console.log("🔍 Footer toggled:", newState);
  }
  // 🔹 Thay đổi tỷ lệ co giãn của DynamicPageTitle
  public toggleAreaPriority(): void {
    const page = this.getPage();
    const title = page?.getTitle();
    if (!title) return;
    const defaultShrinkRatio = title.getMetadata()?.getProperty("areaShrinkRatio")?.defaultValue as string | undefined;
    if (!defaultShrinkRatio) return;
    const newShrinkRatio = title.getAreaShrinkRatio() === defaultShrinkRatio ? "1.6:1:1.6" : defaultShrinkRatio;
    title.setAreaShrinkRatio(newShrinkRatio);
  }
  // 🔹 Mở popover từ fragment
  public onPressOpenPopover(event: Event): void {
    const view = this.getView();
    const sourceControl = event.getSource() as Control;

    if (!this.popover) {
      this.popover = Fragment.load({
        id: view?.getId(),
        name: "base.fragment.ViDu03",
      }).then((control) => {
        const popover = control as Popover; // 👈 ép kiểu ở đây
        view?.addDependent(popover);
        return popover;
      });
    }

    this.popover.then((popover) => {
      popover.openBy(sourceControl);
    });
  }
  // Dynamic Page Freestyle Example Hết
}
