import type { PriceFragment } from "~/gql/graphql";

export const formatPrice = (value: number, fractionDigits: number = 0) => {
    return value.toFixed(fractionDigits)
}

export const getDiscount = (price: PriceFragment) => {
    return price.is_discounted ? price.regular - price.discounted : 0
}

export const getDiscountedOrRegularPrice = (price: PriceFragment) => {
    return price.is_discounted ? price.discounted : price.regular
}