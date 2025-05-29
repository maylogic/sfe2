<template>
    <div v-if="!valid">
        <div class="flex flex-col gap-3 mt-3"
             v-if="!!cart.customer_addresses?.length">
            <u-form-group name="customerAddressId">
                <u-select @change="setAddress" v-model="setState.customerAddressId" :options="options"/>
            </u-form-group>
        </div>
        <div v-if="!cart.customer_addresses?.length && !shippingAddress">Необходимо добавить адрес доставки.</div>
        <div class="flex flex-col gap-3 mt-3">
            <customer-address-info :address="shippingAddress"/>
            <div class="flex items-center gap-2 mx-auto">
                <smallest-button v-if="shippingAddress" @click.prevent="isEditingAddress=true">
                    <u-icon name="i-lucide-pencil"/>
                    Редактировать
                </smallest-button>
                <u-button size="xs" type="button" @click.prevent="isCreatingAddress=true">
                    <span>Новый адрес</span>
                </u-button>
            </div>
            <button type="submit"
                    v-if="shippingAddress"
                    @click="emit('update:valid', true)" class="continue-button">
                <span>Продолжить</span>
            </button>
        </div>
    </div>
    <div v-else class="current-value">
        <customer-address-info :address="shippingAddress"/>
    </div>
    <modal-customer-address-form v-model="isCreatingAddress" :state="state" :fetching="creating"
                                 :on-submit="onSubmitCreateAddress" button-label="Добавить адрес"/>
    <modal-customer-address-form v-model="isEditingAddress" :state="editState" :fetching="updating"
                                 :on-submit="onSubmitUpdateAddress" button-label="Сохранить"/>
</template>
<script setup lang="ts">
import { type InferType } from "yup";
import { customerAddressSchema, } from "~/yup";
import { useMutation } from "@urql/vue";
import {
    CreateShippingAddressDocument,
    type CustomerAddressFragment,
    CustomerAddressFragmentDoc,
    SetShippingAddressDocument,
    UpdateShippingAddressDocument
} from "~/gql/graphql";
import type { FormSubmitEvent } from "#ui/types";
import {
    type FragmentType,
    useFragment
} from "~/gql";
import SmallestButton from "~/components/SmallestButton.vue";

defineProps<{ valid: boolean | null }>()

const emit = defineEmits(['update:valid', 'loading:update'])

const cartStore = useCartStore()
const {cart} = storeToRefs(cartStore)
const isCreatingAddress = ref(false),
    isEditingAddress = ref(false)

const {executeMutation: createAddressExecute, fetching: creating} = useMutation(CreateShippingAddressDocument)
const {executeMutation: updateAddressExecute, fetching: updating} = useMutation(UpdateShippingAddressDocument)
const {executeMutation: setAddressExecute, fetching: setting} = useMutation(SetShippingAddressDocument)

const state = reactive({
    address1: undefined,
    address2: undefined,
    city: undefined,
    country: 'Россия',
    first_name: undefined,
    last_name: undefined,
    phone_number: undefined,
    postal_code: undefined,
    state: undefined,
})
const shippingAddress = computed(() => useFragment(CustomerAddressFragmentDoc, cart.value.shipping_address))

const editState = reactive({
    address1: shippingAddress.value?.address1 ?? undefined,
    address2: shippingAddress.value?.address2 ?? undefined,
    city: shippingAddress.value?.city ?? undefined,
    country: shippingAddress.value?.country ?? undefined,
    first_name: shippingAddress.value?.first_name ?? undefined,
    last_name: shippingAddress.value?.last_name ?? undefined,
    phone_number: shippingAddress.value?.phone_number ?? undefined,
    postal_code: shippingAddress.value?.postal_code ?? undefined,
    state: shippingAddress.value?.state ?? undefined,
})
watch(shippingAddress, (newAd, oldAd) => {
    editState.address1 = newAd?.address1 ?? undefined
    editState.address2 = newAd?.address2 ?? undefined
    editState.city = newAd?.city ?? undefined
    editState.country = newAd?.country ?? undefined
    editState.first_name = newAd?.first_name ?? undefined
    editState.last_name = newAd?.last_name ?? undefined
    editState.phone_number = newAd?.phone_number ?? undefined
    editState.postal_code = newAd?.postal_code ?? undefined
    editState.state = newAd?.state ?? undefined
    setState.customerAddressId = newAd?.id ?? undefined
})
const setState = reactive({
    customerAddressId: shippingAddress.value?.id
})

const getAddressOption = (addressFrag: FragmentType<typeof CustomerAddressFragmentDoc>): {
    label: string,
    value: string
} => {
    const address = useFragment(CustomerAddressFragmentDoc, addressFrag)
    const values: string[] = []
    const keys: (keyof CustomerAddressFragment)[] = [
        'postal_code',
        'country',
        'state',
        'city',
        'address1',
        'address2',
        'first_name',
        'last_name',
    ]
    keys.forEach(key => {
        if (address[key]) values.push(address[key])
    })
    return {
        value: address.id,
        label: values.join(', ')
    }
}
const options = computed(
    () => cart.value.customer_addresses?.map(address => (getAddressOption(address))) ?? []
)

async function setAddress(customerAddressId: string) {
    emit('loading:update', true)
    const {data} = await setAddressExecute({
        customerAddressId
    })
    cartStore.setData(data?.setShippingAddress)
    emit('loading:update', false)
}

type Schema = InferType<typeof customerAddressSchema>

async function onSubmitCreateAddress(event: FormSubmitEvent<Schema>) {
    const {data, error} = await createAddressExecute({
        address1: event.data.address1 ?? null,
        address2: event.data.address2 ?? null,
        city: event.data.city ?? null,
        country: event.data.country ?? null,
        first_name: event.data.first_name ?? null,
        last_name: event.data.last_name ?? null,
        phone_number: event.data.phone_number ?? null,
        postal_code: event.data.postal_code ?? null,
        state: event.data.state ?? null,
    })
    cartStore.setData(data?.createShippingAddress)
    emit('update:valid', true)
    isCreatingAddress.value = false
}

async function onSubmitUpdateAddress(event: FormSubmitEvent<Schema>) {
    const {data, error} = await updateAddressExecute({
        customerAddressId: shippingAddress.value?.id || '0',
        address1: event.data.address1 ?? null,
        address2: event.data.address2 ?? null,
        city: event.data.city ?? null,
        country: event.data.country ?? null,
        first_name: event.data.first_name ?? null,
        last_name: event.data.last_name ?? null,
        phone_number: event.data.phone_number ?? null,
        postal_code: event.data.postal_code ?? null,
        state: event.data.state ?? null,
    })
    cartStore.setData(data?.updateShippingAddress)
    isEditingAddress.value = false
}
</script>