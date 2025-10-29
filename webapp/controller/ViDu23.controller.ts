import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import MessageToast from "sap/m/MessageToast";
import MenuItem from "sap/m/MenuItem";

export default class ViDu23 extends Controller {
  public override onInit(): void {}

  public onDefaultAction(): void {
    MessageToast.show("Default action triggered");
  }

  public onDefaultActionAccept(): void {
    MessageToast.show("Accepted");
  }

  public onBeforeMenuOpen(evt: Event): void {
    MessageToast.show("beforeMenuOpen is fired");
  }

  public onPress(evt: Event): void {
    const source = (evt as any).getSource() as any;
    MessageToast.show(`${source.getId()} Pressed`);
  }

  public onMenuAction(event: Event): void {
    let item = (event as any).getParameter("item") as MenuItem;
    let itemPath = "";

    // Duyệt lên parent chain nếu item là MenuItem
    while (item instanceof MenuItem) {
      itemPath = `${item.getText()} > ${itemPath}`;
      const parent = item.getParent();
      if (parent instanceof MenuItem) {
        item = parent;
      } else {
        break;
      }
    }

    // Loại bỏ ký tự " > " dư thừa ở cuối
    itemPath = itemPath.endsWith(" > ") ? itemPath.slice(0, -3) : itemPath;

    MessageToast.show(`Action triggered on item: ${itemPath}`);
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
