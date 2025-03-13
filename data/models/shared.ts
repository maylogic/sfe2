export type Maybe<TType> = TType | null;

export type SfId = string;

export interface SfMoney {
    currency: string;
    amount: number;
    precisionAmount: string;
}

export interface SfDiscountablePrice {
    isDiscounted: boolean;
    regularPrice: SfMoney;
    /**
     * Price with discounts. If there is no discount, it will be the same as regularPrice
     */
    value: SfMoney;
}

export interface SfImage {
    alt: Maybe<string>;
    url: string;
}

export interface SfAttribute {
    label: string;
    name: string;
    value: string;
    valueLabel: string;
}

export interface SfCreateAddressBody {
    address1: string;
    address2?: Maybe<string>;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    postalCode: string;
    state: string;
    titleCode: string;
}

export interface SfAddress {
    address1: Maybe<string>;
    address2?: Maybe<string>;
    city: Maybe<string>;
    country: Maybe<string>;
    firstName: Maybe<string>;
    lastName: Maybe<string>;
    phoneNumber: Maybe<string>;
    postalCode: Maybe<string>;
    state: Maybe<string>;
    titleCode: Maybe<string>;
}

export type SfCurrency = string;
