import {
    type PriceFragment,
    PriceFragmentDoc,
    type ProductPageFragment,
    type SidebarCartItemFragment,
    SidebarCartItemFragmentDoc
} from "~/gql/graphql";
import {
    type FragmentType,
    useFragment
} from "~/gql";
import { getDiscount } from "~/utils/price";
import type { PersonalizeInputData } from "~/types/product";

export const getCartItemToTrack = (itemFrag: FragmentType<typeof SidebarCartItemFragmentDoc>) => {
    const item = useFragment(SidebarCartItemFragmentDoc, itemFrag),
        price = useFragment(PriceFragmentDoc, item.price)
    return {
        item_id: item.product.sku,
        item_name: item.product.name,
        item_category: "Адресники",
        item_variant: getItemVariantToTrack(item),
        item_brand: "SAFEPETS",
        price: getPriceToTrack(price),
        quantity: item.quantity
    }
}

export const getPriceToTrack = (price: PriceFragment) => {
    return price.is_discounted ? price.discounted : price.regular
}

export const getViewItemToTrack = (product: ProductPageFragment, price: PriceFragment) => {
    return {
        item_id: product.sku,
        item_name: product.name,
        affiliation: getEnvOrPubVal('SITE_DOMAIN'),
        coupon: '',
        discount: getDiscount(price),
        index: 0,
        item_brand: 'SAFEPETS',
        item_category: 'Адресники',
        item_variant: 'Стандартный',
        price: getPriceToTrack(price)
    }
}

export const getAddToCartItemToTrack = (data: PersonalizeInputData, product: ProductPageFragment, price: PriceFragment) => {
    const variant = getDataVariantToTrack(data, product)
    return {
        item_id: product.sku,
        item_name: product.name,
        item_category: "Адресники",
        item_brand: 'SAFEPETS',
        item_variant: variant.join(' / '),
        price: getPriceToTrack(price),
        quantity: 1,
        custom_fields: {
            personalize: getPersonalizeDataToTrack(data)
        }
    }
}
export const getPersonalizeDataToTrack = (data: PersonalizeInputData) => {
    return {
        color: data.color?.label,
        font: data.font?.label,
        design: data.design?.label,
        textLines: [...data.textLines.values()].filter(item => item !== null)
    }
}
export const getDataVariantToTrack = (data: PersonalizeInputData, product: ProductPageFragment): string[] => {
    const variant: string[] = []
    const size = product.sizes.find(size => size.id === data.size)?.label
    if (size) variant.push(`Размер: ${size}`)
    product.options.forEach(option => {
        const valueId = data.options.get(option.id)
        if (valueId) {
            const value = option.items.find(item => item.id === valueId)
            if (value) {
                variant.push(`${option.label}: ${value.label}`)
            }
        }
    })

    return variant
}
export const getItemVariantToTrack = (item: SidebarCartItemFragment): string[] => {
    const variant: string[] = []
    if (item.product_size) {
        variant.push(`Размер: ${item.product_size.label}`)
    }
    item.option_items?.forEach(option => {
        variant.push(`${option.product_option.label}: ${option.label}`)
    })

    return variant
}