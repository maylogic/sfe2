import type {SfCart, SfCartCoupon} from "./cart";
import type {
    SfAddress,
    SfAttribute,
    SfCategory,
    SfCreateAddressBody,
    SfCurrency,
    SfCustomer,
    SfCustomerAddress,
    SfDiscountablePrice,
    SfFacet,
    SfFacetItem,
    SfFacetType,
    SfFacetTypes,
    SfImage,
    SfMoney,
    SfOrder,
    SfOrderLineItem,
    SfOrderListItem,
    SfPagination,
    SfProduct,
    SfProductCatalogItem,
    SfProductReview,
    SfProductVariant,
    SfShippingMethod,
    SfShippingMethods
} from "~/data";

export * from "./cart";
export * from "./category";
export * from "./checkout";
export * from "./customer";
export * from "./facets";
export * from "./product";
export * from "./shared";
export * from "./order";

export interface SfContract {
    SfCartCoupon: SfCartCoupon;
    SfCart: SfCart;
    SfCategory: SfCategory;
    SfShippingMethod: SfShippingMethod;
    SfShippingMethods: SfShippingMethods;
    SfCustomer: SfCustomer;
    SfCustomerAddress: SfCustomerAddress;
    SfFacetTypes: SfFacetTypes;
    SfFacetType: SfFacetType;
    SfFacetItem: SfFacetItem;
    SfFacet: SfFacet;
    SfOrderLineItem: SfOrderLineItem;
    SfOrder: SfOrder;
    SfOrderListItem: SfOrderListItem;
    SfProductVariant: SfProductVariant;
    SfProductReview: SfProductReview;
    SfProduct: SfProduct;
    SfProductCatalogItem: SfProductCatalogItem;
    SfPagination: SfPagination;
    SfMoney: SfMoney;
    SfDiscountablePrice: SfDiscountablePrice;
    SfImage: SfImage;
    SfAttribute: SfAttribute;
    SfCreateAddressBody: SfCreateAddressBody;
    SfAddress: SfAddress;
    SfCurrency: SfCurrency;
}
