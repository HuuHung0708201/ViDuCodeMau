import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import JSONModel from "sap/ui/model/json/JSONModel";
import type PullToRefresh from "sap/m/PullToRefresh";

interface Product {
  Name: string;
  ProductId: string;
  SupplierName: string;
  Price: number;
  CurrencyCode: string;
}

interface ProductData {
  ProductCollection: Product[];
}

export default class ViDu28 extends Controller {
  private _productData!: ProductData;
  private _productCount: number = 0;

  public override onInit(): void {
    // Tạo model
    const oModel = new JSONModel({
      ProductCollection: [],
    });
    // Gán vào view
    this.getView()?.setModel(oModel);
    // Khi lấy dữ liệu, ép kiểu
    const oData = oModel.getData() as ProductData;

    // Load dữ liệu từ file JSON
    jQuery.getJSON(sap.ui.require.toUrl("base/localService/ViDu28.json"), (oData: ProductData) => {
      this._productData = oData;
      this._pushNewProduct();
    });
  }

  // Thêm sản phẩm mới vào collection
  private _pushNewProduct(): void {
    const aColl = this._productData.ProductCollection;
    if (this._productCount < aColl.length) {
      const oView = this.getView();
      // Ép kiểu getModel() về JSONModel
      const oModel = oView?.getModel() as JSONModel;
      // Lấy dữ liệu và ép kiểu sang ProductData
      const oData = oModel.getData() as ProductData;
      // Thêm sản phẩm mới
      oData.ProductCollection.push(aColl[this._productCount++]);
      // Cập nhật lại dữ liệu vào model
      oModel.setData(oData);
    }
  }

  // Xử lý pull-to-refresh
  public handleRefresh(evt: Event): void {
    setTimeout(() => {
      (this.byId("pullToRefresh") as PullToRefresh).hide();
      this._pushNewProduct();
    }, 1000);
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
