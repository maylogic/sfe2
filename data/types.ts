import type { Font } from "~/gql/graphql";

export type AddressFormState = {
    address1: string | undefined
    address2: string | undefined
    city: string | undefined
    country: string | undefined
    first_name: string | undefined
    last_name: string | undefined
    phone_number: string | undefined
    postal_code: string | undefined
    state: string | undefined
}

export type FrontendFont = Pick<Font, 'name' | 'label' | 'filename_ttf' | 'filename_otf' | 'id' | 'updated_at'>