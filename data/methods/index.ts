import type {
    ChangeCustomerPassword,
    GetCustomer,
    LoginCustomer,
    LogoutCustomer,
    RegisterCustomer,
    UpdateCustomer,
} from "./auth";
import type {
    AddCartLineItem,
    ApplyCouponToCart,
    GetCart,
    RemoveCartLineItem,
    RemoveCouponFromCart,
    UpdateCartLineItem,
} from "./cart";
import type {
    CreateCustomerAddress,
    DeleteCustomerAddress,
    GetAvailableShippingMethods,
    GetCategories,
    GetCategory,
    GetCurrencies,
    GetCustomerAddresses,
    GetOrderDetails,
    GetOrders,
    GetProductDetails,
    GetProductReviews,
    GetProducts,
    PlaceOrder,
    SearchProducts,
    SetCartAddress,
    SetCustomerEmail,
    SetShippingMethod,
    UpdateCustomerAddress
} from "~/data";

export * from "./auth";
export * from "./cart";
export * from "./category";
export * from "./checkout";
export * from "./customer";
export * from "./helpers";
export * from "./product";
export * from "./settings";
export * from "./order";

export type UnifiedMethods = {
    getCart: GetCart;
    addCartLineItem: AddCartLineItem;
    updateCartLineItem: UpdateCartLineItem;
    removeCartLineItem: RemoveCartLineItem;
    applyCouponToCart: ApplyCouponToCart;
    removeCouponFromCart: RemoveCouponFromCart;
    getCategories: GetCategories;
    getCategory: GetCategory;
    getCustomer: GetCustomer;
    loginCustomer: LoginCustomer;
    logoutCustomer: LogoutCustomer;
    registerCustomer: RegisterCustomer;
    updateCustomer: UpdateCustomer;
    changeCustomerPassword: ChangeCustomerPassword;
    getProducts: GetProducts;
    getProductDetails: GetProductDetails;
    getProductReviews: GetProductReviews;
    searchProducts: SearchProducts;
    getAvailableShippingMethods: GetAvailableShippingMethods;
    setCartAddress: SetCartAddress;
    setCustomerEmail: SetCustomerEmail;
    setShippingMethod: SetShippingMethod;
    createCustomerAddress: CreateCustomerAddress;
    deleteCustomerAddress: DeleteCustomerAddress;
    updateCustomerAddress: UpdateCustomerAddress;
    getCustomerAddresses: GetCustomerAddresses;
    getCurrencies: GetCurrencies;
    getOrders: GetOrders;
    getOrderDetails: GetOrderDetails;
    placeOrder: PlaceOrder;
};
