import type {Maybe, SfAddress, SfAttribute, SfId, SfImage, SfMoney, SfShippingMethod} from "~/data";

export interface SfOrderLineItem {
    id: SfId;
    attributes: SfAttribute[];
    unitPrice: SfMoney;
    totalPrice: SfMoney;
    quantity: number;
    image: Maybe<SfImage>;
    productId: SfId;
    productName: string;
    sku: Maybe<string>;
}

export interface SfOrder {
    id: SfId;
    orderDate: string;
    status: string;
    lineItems: SfOrderLineItem[];
    subtotalPrice: SfMoney;
    totalShippingPrice: SfMoney;
    totalTax: SfMoney;
    totalPrice: SfMoney;
    shippingAddress: SfAddress;
    billingAddress: Maybe<SfAddress>;
    shippingMethod: SfShippingMethod;
    paymentMethod: string;
}

export interface SfOrderListItem
    extends Pick<SfOrder, "id" | "orderDate" | "totalPrice" | "status"> {
}
