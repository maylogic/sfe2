import type {Maybe, SfMoney} from "~/data";

export interface SfShippingMethod {
    description: Maybe<string>;
    estimatedDelivery: Maybe<string>;
    id: string;
    name: string;
    price: SfMoney;
}

export interface SfShippingMethods {
    methods: SfShippingMethod[];
}
