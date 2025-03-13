import type {Simplify} from "type-fest";
import type {SfOrder, SfOrderListItem, SfPagination} from "~/data";

export interface GetOrdersExtendedArgs {
}

export interface GetOrdersCustomArgs {
}

export type GetOrdersArgs = {
    pageSize?: number;
    currentPage?: number;
    //$extended?: GetOrdersExtendedArgs;
    //$custom?: GetOrdersCustomArgs;
};

export type GetOrders = (args?: Simplify<GetOrdersArgs>) => Promise<{
    orders: SfOrderListItem[];
    pagination: SfPagination;
}>;

export interface GetOrderExtendedArgs {
}

export interface GetOrderCustomArgs {
}

export type GetOrderArgs = {
    id: string;
    //$extended?: GetOrderExtendedArgs;
    //$custom?: GetOrderCustomArgs;
};

export type GetOrderDetails = (args: Simplify<GetOrderArgs>) => Promise<SfOrder>;

export interface PlaceOrderExtendedArgs {
}

export interface PlaceOrderCustomArgs {
}

export type PlaceOrderArgs = {
    //$extended?: PlaceOrderExtendedArgs;
    //$custom?: PlaceOrderCustomArgs;
};

export type PlaceOrder = (args?: Simplify<PlaceOrderArgs>) => Promise<SfOrder>;
