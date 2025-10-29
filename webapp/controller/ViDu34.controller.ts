import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import Dialog from "sap/m/Dialog";
import type SideNavigation from "sap/tnt/SideNavigation";
import Input from "sap/m/Input";
import Label from "sap/m/Label";
import Button from "sap/m/Button";
import { ButtonType } from "sap/m/library";
import type NavigationList from "sap/tnt/NavigationList";
import NavigationListItem from "sap/tnt/NavigationListItem";
import MessageToast from "sap/m/MessageToast";

export default class ViDu34 extends Controller {
  // Dialog QuickAction (lưu tham chiếu để reuse)
  private oDefaultDialog?: Dialog;

  public override onInit(): void {}

  /**
   * Toggle trạng thái mở/đóng SideNavigation
   */
  public onCollapseExpandPress(): void {
    // Lấy SideNavigation control từ View
    const oSideNavigation = this.byId("sideNavigation") as SideNavigation;

    // Lấy trạng thái hiện tại (true = expanded)
    const bExpanded = oSideNavigation.getExpanded();

    // Đổi trạng thái (expanded <-> collapsed)
    oSideNavigation.setExpanded(!bExpanded);
  }

  /**
   * Quick Action: mở Dialog để tạo NavigationListItem mới
   */
  public quickActionPress(): void {
    // Nếu Dialog chưa được tạo, tạo mới
    if (!this.oDefaultDialog) {
      // Tạo các Input để nhập tên và icon
      const oNameInput = new Input({
        width: "100%",
        placeholder: "Name",
      });
      const oIconInput = new Input({
        width: "100%",
        placeholder: "sap-icon://home",
      });

      // Tạo Dialog
      this.oDefaultDialog = new Dialog({
        title: "Create Navigation List Item", // Tiêu đề Dialog
        type: "Message", // Kiểu Dialog
        content: [
          new Label({ text: "Name:", labelFor: "navigationItemName" }),
          oNameInput,
          new Label({ text: "Icon:", labelFor: "navigationItemIcon" }),
          oIconInput,
        ],
        // Nút Create
        beginButton: new Button({
          type: ButtonType.Emphasized, // Nút nổi bật
          text: "Create",
          press: () => {
            // Lấy giá trị từ Input
            const sName = oNameInput.getValue() || "New Navigation Item";
            const sIcon = oIconInput.getValue() || "sap-icon://building";

            // Lấy SideNavigation
            const oSideNavigation = this.byId("sideNavigation") as SideNavigation;

            if (oSideNavigation) {
              // Lấy NavigationList gốc
              const oNavigationList = oSideNavigation.getItem() as NavigationList;

              // Thêm NavigationListItem mới
              oNavigationList.addItem(
                new NavigationListItem({
                  text: sName,
                  expanded: true,
                  icon: sIcon,
                })
              );
            }

            // Đóng Dialog sau khi tạo item
            this.oDefaultDialog?.close();
          },
        }),
        // Nút Cancel
        endButton: new Button({
          text: "Cancel",
          press: () => {
            this.oDefaultDialog?.close(); // Chỉ đóng Dialog
          },
        }),
      });

      // Thêm Dialog làm dependent của view để có thể truy cập model
      this.getView()?.addDependent(this.oDefaultDialog);
    }

    // Mở Dialog
    this.oDefaultDialog.open();
  }

  /**
   * Xử lý sự kiện itemPress của NavigationListItem
   */
  public itemPress(oEvent: any): void {
    // Lấy trạng thái checkbox "prevent default"
    const bPreventDefault = (this.byId("preventDefaultCheckbox") as any).getSelected();

    // Lấy item được nhấn
    const oItem = oEvent.getParameter("item") as NavigationListItem;

    // Lấy text của item
    const sText = oItem.getText();

    // Lấy trạng thái phím modifier
    const bCtrlKey = oEvent.getParameter("ctrlKey");
    const bShiftKey = oEvent.getParameter("shiftKey");
    const bAltKey = oEvent.getParameter("altKey");
    const bMetaKey = oEvent.getParameter("metaKey");

    // Nếu preventDefault được check
    if (bPreventDefault) {
      oEvent.preventDefault(); // Ngăn hành vi mặc định
      MessageToast.show(`Default was prevented:
        Item: ${sText}
        Ctrl Key: ${bCtrlKey}
        Shift Key: ${bShiftKey}
        Alt Key: ${bAltKey}
        Meta Key: ${bMetaKey}`);
    } else {
      // Nếu không preventDefault, chỉ show toast thông báo
      MessageToast.show(`Item Pressed:
        Item: ${sText}
        Ctrl Key: ${bCtrlKey}
        Shift Key: ${bShiftKey}
        Alt Key: ${bAltKey}
        Meta Key: ${bMetaKey}`);
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
