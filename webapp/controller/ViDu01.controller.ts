import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import type Event from "sap/ui/base/Event";
import type Button from "sap/m/Button";
import type ActionSheet from "sap/m/ActionSheet";

export default class ViDu01 extends Controller {
  public override onInit(): void {}

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

  public onButtonPress(event: Event): void {
    // 🔹 Khi người dùng nhấn vào nút (Button), hàm này được gọi.
    //    Tham số 'event' chứa toàn bộ thông tin về sự kiện đó.

    const button = event.getSource() as Button;
    // 🔹 Lấy đối tượng phát sinh sự kiện (event source).
    //    Ở đây chính là Button mà người dùng vừa nhấn.
    //    Dùng "as Button" để TypeScript hiểu đúng kiểu dữ liệu (UI5 control Button).

    const actionSheet = this.byId("actionSheet") as ActionSheet;
    // 🔹 Tìm control có ID là "actionSheet" trong View hiện tại.
    //    Hàm this.byId() dùng để truy xuất control trong View XML.
    //    Ép kiểu về ActionSheet để có thể gọi các hàm đặc trưng của nó.

    if (actionSheet && button) {
      // 🔹 Kiểm tra xem cả hai đối tượng có tồn tại không (đề phòng lỗi null/undefined).

      actionSheet.openBy(button);
      // 🔹 Gọi phương thức openBy() để hiển thị ActionSheet.
      //    ActionSheet sẽ xuất hiện “neo” (anchor) ngay bên dưới nút mà ta nhấn.
      //    Đây là đặc trưng của ActionSheet: nó cần một control làm điểm neo.
    } else {
      console.warn("ActionSheet hoặc Button chưa sẵn sàng.");
      // 🔹 Ghi cảnh báo trong console nếu ActionSheet hoặc Button chưa sẵn sàng.
      //    Giúp dễ dàng debug khi ActionSheet chưa được khởi tạo đúng cách.
    }
  }
}
