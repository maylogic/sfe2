import type {SetCartAddressArgs, SetShippingAddress} from "~/data";

export function isShippingAddress(args: SetCartAddressArgs): args is SetShippingAddress {
    return (args as SetShippingAddress).shippingAddress !== undefined;
}
