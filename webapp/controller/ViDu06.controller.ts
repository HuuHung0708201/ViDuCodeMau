import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import JSONModel from "sap/ui/model/json/JSONModel";
import Log from "sap/base/Log";
import MessageToast from "sap/m/MessageToast";
import type Button from "sap/m/Button";
import type Popover from "sap/m/Popover";
import type Event from "sap/ui/base/Event";

// 🧱 Lấy enum BreadcrumbsSeparatorStyle từ thư viện sap.m

export default class ViDu06 extends Controller {
  public override onInit(): void {
    const addData = (vm: JSONModel) => {
      vm.setProperty("/value", "HelloWorld!");
      vm.setProperty("/countries", [
        { key: "DZ", text: "Algeria" },
        { key: "AR", text: "Argentina" },
      ]);
    };

    const viewModel = this.getView()?.getModel("viewModel") as JSONModel | undefined;

    if (viewModel) {
      addData(viewModel);
    } else {
      // Nếu chưa có model, tạo mới và attach
      const newModel = new JSONModel();
      this.getView()?.setModel(newModel, "viewModel");
      addData(newModel);
    }
  }

  // Hàm lưu
  onSave(): void {
    const viewModel = this.getView()?.getModel("viewModel") as JSONModel | undefined;
    if (viewModel) {
      // console.log(JSON.stringify(viewModel.getData(), null, 2));
      MessageToast.show("CTRL+S: save triggered on controller");
    } else {
      MessageToast.show("Model chưa sẵn sàng, không thể save.");
      Log.error("ViewModel chưa được attach khi gọi onSave");
    }
  }

  // Hàm xoá
  public onDelete(): void {
    MessageToast.show("CTRL+D: Delete triggered on controller");
  }

  // Bật/Tắt trạng thái enable cho nút Save
  public onToggleSave(event: Event & { getParameter: (param: string) => boolean }): void {
    (this.getView()?.byId("CE_SAVE") as Button)?.setEnabled(event.getParameter("state"));
  }

  // Bật/Tắt trạng thái enable cho nút Delete
  public onToggleDelete(event: Event & { getParameter: (param: string) => boolean }): void {
    (this.getView()?.byId("CE_DELETE") as Button).setEnabled(event.getParameter("state"));
  }

  // Bật/Tắt trạng thái enable cho nút Save trong Popover
  public onTogglePopoverSave(event: Event & { getParameter: (param: string) => boolean }): void {
    (this.getView()?.byId("CE_SAVE_POPOVER") as Button).setEnabled(event.getParameter("state"));
  }

  // Bật/Tắt hiển thị nút Save
  public onToggleSaveVisibility(event: Event & { getParameter: (param: string) => boolean }): void {
    (this.getView()?.byId("CE_SAVE") as Button)?.setEnabled(event.getParameter("state"));
  }

  // Bật/Tắt hiển thị nút Delete
  public onToggleDeleteVisibility(event: Event & { getParameter: (param: string) => boolean }): void {
    (this.getView()?.byId("CE_DELETE") as Button).setVisible(event.getParameter("state"));
  }

  // Bật/Tắt hiển thị nút Save trong Popover
  public onTogglePopoverSaveVisibility(event: Event & { getParameter: (param: string) => boolean }): void {
    (this.getView()?.byId("CE_SAVE_POPOVER") as Button).setVisible(event.getParameter("state"));
  }

  // Mở Popover chính khi click button
  public onPopoverOpen(event: Event): void {
    const popover = this.byId("popover") as Popover | undefined;
    const button = event.getSource() as Button | undefined;

    // Kiểm tra tồn tại trước khi gọi openBy
    if (popover && button) {
      popover.openBy(button);
    }
  }

  // Mở Popover chứa Command khi click button
  onCommandPopoverOpen(event: Event): void {
    // Ép kiểu về Popover
    const popover = this.byId("popoverCommand") as Popover | undefined;
    // Ép kiểu về Button (hoặc control gọi sự kiện)
    const button = event.getSource() as Button | undefined;
    // Kiểm tra tồn tại trước khi mở popover
    if (popover && button) {
      popover.openBy(button);
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
