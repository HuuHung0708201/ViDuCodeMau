import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import History from "sap/ui/core/routing/History";
import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";
import type PullToRefresh from "sap/m/PullToRefresh";
import type List from "sap/m/List";
import type SearchField from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import type ListBinding from "sap/ui/model/ListBinding";

interface Product {
  Name: string;
  ProductId: string;
  ProductPicUrl: string;
  SupplierName: string;
  Price: number;
  CurrencyCode: string;
}

interface ProductData {
  ProductCollection: Product[];
}

export default class ViDu29 extends Controller {
  private _productData!: ProductData;
  private _productCount: number = 0;

  public override onInit(): void {
    const oView = this.getView();

    // Device model
    const deviceModel = new JSONModel({
      isNoTouch: !Device.support.touch,
      isTouch: Device.support.touch,
    });
    deviceModel.setDefaultBindingMode("OneWay");
    oView?.setModel(deviceModel, "device");

    // Responsiveness: move search bar below pull-to-refresh on touch devices
    if (Device.support.touch) {
      const bar = this.byId("searchBar");
      const page = this.byId("page");

      if (bar && page) {
        page.insertAggregation("content", bar, 1);
      }
    }

    // Create mock product model
    oView?.setModel(
      new JSONModel({
        ProductCollection: [],
      })
    );

    // Load product data
    jQuery.getJSON(sap.ui.require.toUrl("base/localService/ViDu29.json"), (oData: ProductData) => {
      this._productData = oData;
      this._pushNewProduct();
    });
  }

  // Add new product to the collection
  private _pushNewProduct(): void {
    const aColl = this._productData.ProductCollection;
    if (this._productCount < aColl.length) {
      const oView = this.getView();
      const oModel = oView?.getModel() as JSONModel;
      const oData = oModel.getData() as ProductData;

      oData.ProductCollection.push(aColl[this._productCount++]);
      oModel.setData(oData);
    }
  }

  // Handle pull-to-refresh
  public handleRefresh(): void {
    setTimeout(() => {
      this._pushNewProduct();

      (this.byId("pullToRefresh") as PullToRefresh).hide();

      // Apply search filter
      const oSearchField = this.byId("searchField") as SearchField;
      const sQuery = oSearchField.getValue();
      const aFilters: Filter[] = [];

      if (sQuery && sQuery.length) {
        aFilters.push(new Filter("Name", FilterOperator.Contains, sQuery));
      }
      const oList = this.byId("list") as List;
      const oBinding = oList.getBinding("items") as ListBinding;

      if (oBinding) {
        oBinding.filter(aFilters);
      }
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
