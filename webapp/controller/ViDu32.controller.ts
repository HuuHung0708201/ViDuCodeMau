import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import Dialog from "sap/m/Dialog";
import type SideNavigation from "sap/tnt/SideNavigation";
import Label from "sap/m/Label";
import Input from "sap/m/Input";
import Button from "sap/m/Button";
import type { ButtonType } from "sap/m/library";
import NavigationListItem from "sap/tnt/NavigationListItem";
import type NavigationList from "sap/tnt/NavigationList";

export default class ViDu32 extends Controller {
  private oDefaultDialog?: Dialog;

  public override onInit(): void {}

  // Xử lý collapse/expand của SideNavigation
  public onCollapseExpandPress(): void {
    const oSideNavigation = this.byId("sideNavigation") as SideNavigation;
    if (!oSideNavigation) return;

    const bExpanded = oSideNavigation.getExpanded();
    oSideNavigation.setExpanded(!bExpanded);
  }

  // Xử lý sự kiện quick action mở dialog tạo NavigationListItem mới
  public quickActionPress(): void {
    // Kiểm tra xem Dialog đã được tạo chưa
    if (!this.oDefaultDialog) {
      // Tạo Input cho tên NavigationListItem và lưu trực tiếp vào biến
      const oNameInput = new Input({
        width: "100%", // Chiều rộng chiếm toàn bộ container
        placeholder: "Name", // Text hiển thị khi input rỗng
      });

      // Tạo Input cho icon NavigationListItem
      const oIconInput = new Input({
        width: "100%",
        placeholder: "sap-icon://home",
      });

      // Tạo Dialog mới
      this.oDefaultDialog = new Dialog({
        title: "Create Navigation List Item", // Tiêu đề Dialog
        type: "Message", // Kiểu Dialog: Message
        content: [
          // Label cho input tên
          new Label({ text: "Name:", labelFor: "navigationItemName" }),
          // Input tên
          oNameInput,
          // Label cho input icon
          new Label({ text: "Icon:", labelFor: "navigationItemIcon" }),
          // Input icon
          oIconInput,
        ],
        // Nút "Create" ở đầu Dialog
        beginButton: new Button({
          type: "Emphasized" as ButtonType, // Nút nhấn nổi bật
          text: "Create", // Text hiển thị
          press: () => {
            // Lấy giá trị trực tiếp từ các Input đã tạo
            const sName = oNameInput.getValue() || "New Navigation Item"; // Nếu rỗng, dùng mặc định
            const sIcon = oIconInput.getValue() || "sap-icon://building"; // Nếu rỗng, dùng mặc định

            // Lấy SideNavigation từ view
            const oSideNavigation = this.byId("sideNavigation") as SideNavigation;
            if (oSideNavigation) {
              // Lấy NavigationList bên trong SideNavigation
              const oNavigationList = oSideNavigation.getItem() as NavigationList;
              // Thêm NavigationListItem mới vào NavigationList
              oNavigationList.addItem(
                new NavigationListItem({
                  text: sName, // Text của item
                  expanded: true, // Mặc định item mở rộng
                  icon: sIcon, // Icon của item
                })
              );
            }

            // Đóng Dialog sau khi thêm item
            this.oDefaultDialog?.close();
          },
        }),
        // Nút "Cancel" ở cuối Dialog
        endButton: new Button({
          text: "Cancel",
          press: () => this.oDefaultDialog?.close(), // Chỉ đóng Dialog, không làm gì thêm
        }),
      });

      // Thêm Dialog làm dependent của view, để dialog có thể truy cập model
      this.getView()?.addDependent(this.oDefaultDialog);
    }

    // Mở Dialog (nếu đã tạo hoặc vừa tạo xong)
    this.oDefaultDialog.open();
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
