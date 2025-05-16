<template>
    <div class="flex flex-col gap-3 mt-3"
         v-if="!!cart.customer_addresses?.length">
        <u-form-group name="customerAddressId">
            <u-select @change="setAddress" v-model="setState.customerAddressId" :options="options"/>
        </u-form-group>
    </div>
    <div class="flex flex-col gap-3 mt-3">
        <div class="flex flex-col gap-2" v-if="shippingAddress">
            <div class="flex flex-col gap-2">
                <div class="flex items-start gap-1">
                    <div>{{ shippingAddress.first_name }}</div>
                    <div>{{ shippingAddress.last_name }}</div>
                </div>
                <div>{{ shippingAddress.phone_number }}</div>
                <div class="flex items-start gap-1 flex-wrap">
                    <div>{{ shippingAddress.country }},</div>
                    <div>{{ shippingAddress.state }},</div>
                    <div>{{ shippingAddress.city }}</div>
                </div>
                <div>{{ shippingAddress.address1 }}</div>
                <div v-if="shippingAddress.address2">{{ shippingAddress.address2 }}</div>
                <div>{{ shippingAddress.postal_code }}</div>
            </div>
        </div>
        <div class="flex items-center gap-2 mx-auto">
            <smallest-button v-if="shippingAddress" @click.prevent="isEditingAddress=true">
                <u-icon name="i-lucide-pencil"/>
                Редактировать
            </smallest-button>
            <u-button variant="outline" size="xs" type="button" @click.prevent="isCreatingAddress=true">
                <span>Новый адрес</span>
            </u-button>
        </div>
        <button type="submit"
                v-if="shippingAddress"
                @click="emit('update:valid', true)" class="continue-button">
            <span>Продолжить</span>
        </button>
    </div>

    <u-modal v-model="isCreatingAddress" :overlay="false">
        <u-form class="flex flex-col gap-3 mt-3" :schema="schema" :state="state" @submit="onSubmitCreateAddress">
            <u-card>
                <template #header>
                    <div class="flex flex-col gap-2">
                        <div class="grid grid-cols-2 items-start gap-2">
                            <u-form-group name="first_name" label="Имя">
                                <u-input name="first_name" v-model="state.first_name"/>
                            </u-form-group>
                            <u-form-group name="last_name" label="Фамилия">
                                <u-input name="last_name" v-model="state.last_name"/>
                            </u-form-group>
                        </div>
                        <u-form-group name="phone_number" label="Телефон получателя">
                            <u-input name="phone" v-model="state.phone_number"/>
                        </u-form-group>
                        <div class="grid grid-cols-2 items-start gap-2">
                            <u-form-group name="country" label="Страна">
                                <u-input name="country" v-model="state.country"/>
                            </u-form-group>
                            <u-form-group name="city" label="Город">
                                <u-input name="city" v-model="state.city"/>
                            </u-form-group>
                        </div>
                        <u-form-group name="address1" label="Адрес 1">
                            <u-input name="address1" v-model="state.address1"/>
                        </u-form-group>
                        <u-form-group name="address2" label="Адрес 2">
                            <u-input name="address2" v-model="state.address2"/>
                        </u-form-group>
                        <u-form-group name="postal_code" label="Индекс">
                            <u-input name="postal_code" v-model="state.postal_code"/>
                        </u-form-group>
                        <u-form-group name="state" label="Регион">
                            <u-input name="state" v-model="state.state"/>
                        </u-form-group>
                    </div>
                    <loading-overlay v-if="creating">
                        <loading-page label="Создание"/>
                    </loading-overlay>
                </template>

                <template #footer>
                    <div class="flex items-center gap-2">
                        <u-button
                            type="submit"
                            label="Добавить адрес"
                            :disabled="creating"
                        />
                        <u-button
                            label="Отмена"
                            @click="isCreatingAddress = false"
                            :disabled="creating"
                            color="gray"
                        />
                    </div>
                </template>
            </u-card>
        </u-form>
    </u-modal>

    <u-modal v-model="isEditingAddress" :overlay="false">
        <u-form class="flex flex-col gap-3 mt-3" :schema="schema" :state="editState" @submit="onSubmitUpdateAddress">
            <u-card>
                <template #header>
                    <div class="flex flex-col gap-2">
                        <div class="grid grid-cols-2 items-start gap-2">
                            <u-form-group name="first_name" label="Имя">
                                <u-input name="first_name" v-model="editState.first_name"/>
                            </u-form-group>
                            <u-form-group name="last_name" label="Фамилия">
                                <u-input name="last_name" v-model="editState.last_name"/>
                            </u-form-group>
                        </div>
                        <u-form-group name="phone_number" label="Телефон получателя">
                            <u-input name="phone" v-model="editState.phone_number"/>
                        </u-form-group>
                        <div class="grid grid-cols-2 items-start gap-2">
                            <u-form-group name="country" label="Страна">
                                <u-input name="country" v-model="editState.country"/>
                            </u-form-group>
                            <u-form-group name="city" label="Город">
                                <u-input name="city" v-model="editState.city"/>
                            </u-form-group>
                        </div>
                        <u-form-group name="address1" label="Адрес 1">
                            <u-input name="address1" v-model="editState.address1"/>
                        </u-form-group>
                        <u-form-group name="address2" label="Адрес 2">
                            <u-input name="address2" v-model="editState.address2"/>
                        </u-form-group>
                        <u-form-group name="postal_code" label="Индекс">
                            <u-input name="postal_code" v-model="editState.postal_code"/>
                        </u-form-group>
                        <u-form-group name="state" label="Регион">
                            <u-input name="state" v-model="editState.state"/>
                        </u-form-group>
                    </div>
                    <loading-overlay v-if="updating">
                        <loading-page label="Обновление"/>
                    </loading-overlay>
                </template>

                <template #footer>
                    <div class="flex items-center gap-2">
                        <u-button
                            type="submit"
                            label="Обновить адрес"
                            :disabled="updating"
                        />
                        <u-button
                            label="Отмена"
                            @click="isEditingAddress = false"
                            :disabled="updating"
                            color="gray"
                        />
                    </div>
                </template>
            </u-card>
        </u-form>
    </u-modal>
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

const schema = customerAddressSchema
type Schema = InferType<typeof schema>

async function setAddress(customerAddressId: string) {
    console.log('set', customerAddressId)
    emit('loading:update', true)
    const {data} = await setAddressExecute({
        customerAddressId
    })
    cartStore.setData(data?.setShippingAddress)
    emit('loading:update', false)
}

async function onSubmitCreateAddress(event: FormSubmitEvent<Schema>) {
    try {
        emit('loading:update', true)
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
    } catch {

    } finally {
        emit('loading:update', false)
    }
}

async function onSubmitUpdateAddress(event: FormSubmitEvent<Schema>) {
    try {
        emit('loading:update', true)
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
    } catch {

    } finally {
        emit('loading:update', false)
    }
}
</script>