<template>
    <u-modal @update:modelValue="toggleClose" :model-value="modelValue">
        <u-form :schema="schema" :state="state" @submit.prevent="onSubmit">
            <u-card>
                <div class="flex flex-col gap-2 pt-1">
                    <u-button color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                              class="absolute top-1 right-1"
                              @click="toggleClose(false)"/>
                    <div class="grid grid-cols-2 items-start gap-2">
                        <u-form-group name="first_name" label="Имя">
                            <u-input autocomplete="shipping given-name" name="first_name" v-model="state.first_name"/>
                        </u-form-group>
                        <u-form-group name="last_name" label="Фамилия">
                            <u-input autocomplete="shipping family-name" name="last_name" v-model="state.last_name"/>
                        </u-form-group>
                    </div>
                    <u-form-group name="phone_number" label="Телефон получателя">
                        <u-input autocomplete="shipping tel" name="phone_number" v-model="state.phone_number"/>
                    </u-form-group>
                    <div class="grid grid-cols-2 items-start gap-2">
                        <u-form-group name="country" label="Страна">
                            <u-input autocomplete="shipping country" name="country" v-model="state.country"/>
                        </u-form-group>
                        <u-form-group name="city" label="Город">
                            <u-input autocomplete="shipping city" name="city" v-model="state.city"/>
                        </u-form-group>
                    </div>
                    <u-form-group name="address1" label="Адрес 1">
                        <u-input autocomplete="shipping address-line1" name="address1" v-model="state.address1"/>
                    </u-form-group>
                    <u-form-group name="address2" label="Адрес 2">
                        <u-input autocomplete="shipping address-line2" name="address2" v-model="state.address2"/>
                    </u-form-group>
                    <u-form-group name="postal_code" label="Индекс">
                        <u-input autocomplete="shipping postal-code" name="postal_code" v-model="state.postal_code"/>
                    </u-form-group>
                    <u-form-group name="state" label="Регион">
                        <u-input autocomplete="shipping state" name="state" v-model="state.state"/>
                    </u-form-group>
                </div>
                <loading-overlay v-if="fetching">
                    <loading-page label="Создание"/>
                </loading-overlay>

                <template #footer>
                    <div class="flex items-center gap-2">
                        <u-button
                            type="submit"
                            :label="buttonLabel"
                            :disabled="fetching"
                        />
                        <u-button
                            label="Отмена"
                            @click="toggleClose(false)"
                            :disabled="fetching"
                            color="gray"
                        />
                    </div>
                </template>
            </u-card>
        </u-form>
    </u-modal>
</template>
<script setup lang="ts">
import type { AddressFormState } from "~/data/types";
import { customerAddressSchema } from "~/yup";
import type { InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const schema = customerAddressSchema
type Schema = InferType<typeof schema>

defineProps<{
    modelValue: boolean,
    fetching: boolean,
    state: AddressFormState,
    onSubmit: (event: FormSubmitEvent<Schema>) => Promise<void>,
    buttonLabel: string
}>()

const emit = defineEmits(['update:modelValue'])

function toggleClose(newValue: boolean) {
    emit('update:modelValue', newValue)
}
</script>