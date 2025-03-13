import type {SfAddress, SfId} from "~/data";

export interface SfCustomer {
    id: SfId;
    email: string;
    firstName: string;
    lastName: string;
}

export interface SfCustomerAddress extends SfAddress {
    id: SfId;
}
