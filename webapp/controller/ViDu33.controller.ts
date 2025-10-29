import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type Popover from "sap/m/Popover";
import Dialog from "sap/m/Dialog";
import type { ButtonType } from "sap/m/library";
import Button from "sap/m/Button";
import Fragment from "sap/ui/core/Fragment";
import Device from "sap/ui/Device";
import type NavigationListItem from "sap/tnt/NavigationListItem";
import type NavContainer from "sap/m/NavContainer";
import type Page from "sap/m/Page";
import type VBox from "sap/m/VBox";
import Text from "sap/m/Text";

export default class ViDu33 extends Controller {
  private _oPopover?: Popover;
  private oDefaultDialog?: Dialog;
  private ButtonType: ButtonType = "Default" as ButtonType; // fallback

  public override onInit(): void {}

  /**
   * Toggle SideNavigation Popover khi nhấn nút
   */
  public async onToggleSideNav(oEvent: any): Promise<void> {
    const oButton = oEvent.getSource() as Button; // Lấy Button nhấn sự kiện
    const oView = this.getView(); // Lấy View hiện tại

    // Nếu Popover chưa tồn tại, load Fragment
    if (!this._oPopover) {
      this._oPopover = (await Fragment.load({
        id: oView?.getId(), // ID base để tránh trùng
        name: "base/fragment/ViDu33", // Path fragment
        controller: this, // Controller gán cho fragment
      })) as Popover;

      // Thêm Popover làm dependent để có thể access model của View
      oView?.addDependent(this._oPopover);

      // Nếu thiết bị là phone, hiển thị header
      this._oPopover.setShowHeader(Device.system.phone);
    }

    // Nếu Popover đang mở thì đóng, ngược lại mở ra
    if (this._oPopover.isOpen()) {
      this._oPopover.close();
    } else {
      this._oPopover.openBy(oButton); // Mở Popover gắn vào Button
    }
  }

  /**
   * Xử lý khi chọn item trong SideNavigation
   */
  public onItemSelect(oEvent: any): void {
    const oItem = oEvent.getParameter("item") as NavigationListItem; // Lấy NavigationListItem được chọn
    const sKey = oItem.getKey(); // Lấy key của item
    const oNavCon = this.byId("pageContainer") as NavContainer; // Lấy NavContainer từ view

    // Nếu item có key và selectable, load page tương ứng
    if (sKey && oItem.getSelectable()) {
      const oVBox = (this.byId(sKey) as Page).getContent()[0] as VBox; // Lấy VBox đầu tiên trong page
      const oText = oVBox.getItems()[0] as Text; // Lấy Text đầu tiên trong VBox
      oText.setText("Fired event to load page " + sKey.replace("page", "")); // Update nội dung text
      oNavCon.to(this.byId(sKey) as Page); // Chuyển NavContainer sang page tương ứng
    }

    // Nếu Popover đang mở, đóng Popover
    if (this._oPopover?.isOpen()) {
      this._oPopover.close();
    }
  }

  /**
   * Quick Action: mở Dialog tạo item mới
   */
  public onQuickActionPress(): void {
    // Nếu Dialog chưa tồn tại, tạo mới
    if (!this.oDefaultDialog) {
      this.oDefaultDialog = new Dialog({
        title: "Create Item", // Tiêu đề Dialog
        type: "Message", // Kiểu Dialog
        content: new Text({
          // Nội dung đơn giản là Text
          text: "Create New Navigation List Item",
        }),
        beginButton: new Button({
          // Nút Create
          type: "Emphasized" as ButtonType, // Nút nổi bật
          text: "Create",
          press: () => {
            this.oDefaultDialog?.close(); // Đóng Dialog khi nhấn Create
          },
        }),
        endButton: new Button({
          // Nút Cancel
          text: "Cancel",
          press: () => {
            this.oDefaultDialog?.close(); // Đóng Dialog khi nhấn Cancel
          },
        }),
      });

      // Thêm Dialog làm dependent để có thể truy cập model của view
      this.getView()?.addDependent(this.oDefaultDialog);
    }

    // Mở Dialog
    this.oDefaultDialog.open();

    // Nếu Popover đang mở, đóng Popover
    if (this._oPopover?.isOpen()) {
      this._oPopover.close();
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
