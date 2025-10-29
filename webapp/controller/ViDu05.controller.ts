import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import JSONModel from "sap/ui/model/json/JSONModel";
import Input from "sap/m/Input";
import Button from "sap/m/Button";
import Label from "sap/m/Label";
import CheckBox from "sap/m/CheckBox";
import type Select from "sap/m/Select";

// 🧱 Lấy enum BreadcrumbsSeparatorStyle từ thư viện sap.m

export default class ViDu05 extends Controller {
  public static readonly BADGE_MIN_VALUE = 1;
  public static readonly BADGE_MAX_VALUE = 9999;

  private model!: JSONModel;
  private label!: Label;
  private button!: Button;
  private min!: Input;
  private max!: Input;
  private current!: Input;
  private labelCheckBox!: CheckBox;
  private minValue!: number;
  private maxValue!: number;

  public override onInit(): void {
    // Tạo model
    this.model = new JSONModel({
      badgeMin: "1",
      badgeMax: "10",
      badgeCurrent: 1,
      buttonText: "Button with Badge",
      buttonIcon: "sap-icon://cart",
      buttonType: "Default",
      badgeStyle: "Default",
      buttonWithIcon: true,
      buttonWithText: true,
    });

    this.getView()?.setModel(this.model);
    // Lấy các control trong View
    this.label = this.byId("ButtonLabel") as Label;
    this.button = this.byId("BadgedButton") as Button;
    this.min = this.byId("MinInput") as Input;
    this.max = this.byId("MaxInput") as Input;
    this.current = this.byId("CurrentValue") as Input;
    this.labelCheckBox = this.byId("LabelCheckBox") as CheckBox;
    this.minValue = parseInt(this.min.getValue());
    this.maxValue = parseInt(this.max.getValue());
    // Khởi tạo badge
    this.currentChangeHandler();
  }

  /**
   * Handler khi thay đổi current/min/max
   */
  public currentChangeHandler(): void {
    const current = this.current.getValue();
    const buttonBadgeCustomData = (this.button as any).getBadgeCustomData?.();
    const value = current.toString();
    if (!buttonBadgeCustomData) {
      return;
    }
    buttonBadgeCustomData.setValue(value);
  }

  // xử lý khi người dùng thay đổi giá trị "giới hạn nhỏ nhất"
  public minChangeHandler(): void {
    const min = parseInt(this.model.getProperty("/badgeMin"));
    if (min >= ViDu05.BADGE_MIN_VALUE && min <= this.maxValue) {
      (this.button as any).setBadgeMinValue(min);
      this.minValue = min;
    } else {
      this.min.setValue(this.minValue.toString());
    }
  }

  // xử lý khi người dùng thay đổi giá trị "giới hạn lớn nhất"
  public maxChangeHandler(): void {
    const max = parseInt(this.model.getProperty("/badgeMax"));
    if (max <= ViDu05.BADGE_MAX_VALUE && max >= this.minValue) {
      (this.button as any).setBadgeMaxValue(max);
      this.maxValue = max;
    } else {
      this.max.setValue(this.maxValue.toString());
    }
  }

//   public onBadgeStyleChange(event: Event): void {
//     const selectedKey = ((event as any).getSource() as Select).getSelectedKey();
//     // Cập nhật badgeStyle qua setProperty
//     this.button.setProperty("badgeStyle", selectedKey);
//     if (selectedKey === "Attention") {
//         // Ẩn số badge bằng cách set badge rỗng
//         this.button.setProperty("badge", "");
//     } else {
//         // Hiển thị lại số hiện tại
//         const current = this.model.getProperty("/badgeCurrent");
//         this.button.setProperty("badge", current);
//     }
// }


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
