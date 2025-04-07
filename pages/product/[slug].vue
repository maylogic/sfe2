<template>
    <div class="product-page" v-if="!!data?.getProductBySlug">
        <product-page-gallery :gallery="data.getProductBySlug.gallery"/>
        <div class="flex flex-col">
            <product-info :product="data.getProductBySlug"/>
            <div class="create-fields">
                <h2 class="font-iskra">Создание и предпросмотр</h2>
                <product-designs @update:design="updateDesign"
                                 :index="1"
                                 :current-design="addProductData.design"
                                 :data="data.getProductBySlug.designs" :valid="personalizeValidity.design"/>
                <product-colors @update:color="updateColor"
                                :key="addProductData.design?.id"
                                v-if="availableColors.length"
                                :index="2"
                                :color-id="addProductData.colorId"
                                :data="availableColors" :valid="personalizeValidity.colorId"/>
                <product-fonts @update:font="updateFont"
                               v-if="availableFonts.length"
                               :key="addProductData.design?.id"
                               :index="3"
                               :font-id="addProductData.fontId"
                               :data="availableFonts" :valid="personalizeValidity.fontId"/>
                <product-text-lines v-if="addProductData.design && data.getProductBySlug.line_definitions"
                                    :errors="textLineErrors"
                                    :hidden="hiddenTextLines"
                                    :values="addProductData.textLines"
                                    :data="data.getProductBySlug.line_definitions" :index="4"
                                    @hide="hideTextLine"
                                    @show="showTextLine"
                                    @update:text-line="updateTextLine"
                                    :valid="personalizeValidity.textLines"/>

                <price class="text-2xl" :key="data.getProductBySlug.key" :data="data.getProductBySlug.price"/>

                <UButton
                    :label="addingToCart ? 'Добавляем в корзину...' : 'Создать мой адресник'"
                    :disabled="fetching||addingToCart"
                    size="sm"
                    @click="addToCart"
                    class="uppercase font-bebas-neue pt-2 max-w-max text-2xl"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    useMutation,
    useQuery
} from '@urql/vue'
import {
    AddCartItemDocument,
    type Color,
    type DesignItemFragment,
    type Font,
    ProductBySlugDocument
} from '~/gql/graphql.js'
import {
    getNullValidation,
    type PersonalizeInputData,
    type PersonalizeValidity,
    validateColor,
    validateDesign,
    validateFont,
    validatePerTextLine,
    validateTextLines
} from "~/utils/product";
import { getKeys } from "~/utils/type"
import { useCartStore } from "~/stores/cart";

const route = useRoute()
const productSlug = route.params.slug.toString()

const {data, error, fetching, executeQuery} = await useQuery({
    query: ProductBySlugDocument,
    variables: {slug: productSlug},
})

if (error.value) {
    console.error('GraphQL Error:', error.value)
    throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
    })
}

if (!data.value?.getProductBySlug) {
    // Если продукт не найден, выбрасываем 404 ошибку
    throw createError({statusCode: 404, statusMessage: 'Страница не найдена'})
}

const addProductData = reactive<PersonalizeInputData>({
    design: null,
    colorId: null,
    fontId: null,
    textLines: new Map<string, string | null>()
})
const textLineErrors = ref(new Map<string, string>())
const hiddenTextLines = ref(new Map<number, boolean>())
const valid = ref(false)
const personalizeValidity = reactive<PersonalizeValidity>(getNullValidation())
const validate = () => {
    personalizeValidity.design = validateDesign(data.value, addProductData)
    personalizeValidity.colorId = validateColor(data.value, addProductData)
    personalizeValidity.fontId = validateFont(data.value, addProductData)
    personalizeValidity.textLines = validateTextLines(data.value, addProductData)
    valid.value = getKeys(personalizeValidity).every(key => personalizeValidity[key])
}
const {executeMutation: addToCartExec, fetching: addingToCart} = useMutation(AddCartItemDocument)
const cart = useCartStore()
const addToCart = () => {
    if (!data.value?.getProductBySlug) return
    validate()
    textLineErrors.value = validatePerTextLine(data.value, addProductData)
    if (valid.value) {
        addToCartExec({
            productId: data.value?.getProductBySlug.id,
            quantity: 1,
        }).then((result) => {
            if (result.data?.addCartItem) {
                cart.setData(result.data?.addCartItem)
                cart.open = true
            }
        })
    }
}
const availableColors = ref<Array<Pick<Color, 'id' | 'label' | 'hex'>>>([])
const availableFonts = ref<Array<Pick<Font, 'id' | 'label' | 'preview'>>>([])
const updateDesign = (design: DesignItemFragment | null) => {
    addProductData.design = design
    personalizeValidity.design = design ? validateDesign(data.value, addProductData) : null
    if (!design?.colors?.find(color => color.id === addProductData.colorId)) {
        addProductData.colorId = null
        personalizeValidity.colorId = null
    }
    if (!design?.fonts?.find(font => font.id === addProductData.fontId)) {
        addProductData.fontId = null
        personalizeValidity.fontId = null
    }
    availableColors.value = design?.colors ? [...design?.colors] : []
    availableFonts.value = design?.fonts ? [...design?.fonts] : []
}
const updateColor = (colorId: string | null) => {
    addProductData.colorId = colorId
    personalizeValidity.colorId = colorId ? validateColor(data.value, addProductData) : null
}
const updateFont = (fontId: string | null) => {
    addProductData.fontId = fontId
    personalizeValidity.fontId = fontId ? validateFont(data.value, addProductData) : null
}
const updateTextLine = (lineId: string, value: string | null) => {
    addProductData.textLines.set(lineId, value)
    const hadErrors = textLineErrors.value.size !== 0
    textLineErrors.value.delete(lineId)
    if (hadErrors && textLineErrors.value.size === 0) {
        personalizeValidity.textLines = true
    }
}
const hideTextLine = (lineId: string) => {
    addProductData.textLines.delete(lineId)
    textLineErrors.value.delete(lineId)
    hiddenTextLines.value.set(parseInt(lineId), true)
}
const showTextLine = () => {
    const ids = [...hiddenTextLines.value.keys()].sort()
    if (ids.length) {
        hiddenTextLines.value.delete(ids[0])
    }
}

if (data.value.getProductBySlug) {
    const textData = new Map<string, string | null>(),
        hidden = new Map<number, boolean>()
    data.value?.getProductBySlug?.line_definitions?.forEach(def => {
        textData.set(def.id, null)
        if (def.hidden) {
            hidden.set(parseInt(def.id), true)
        }
    })
    addProductData.textLines = textData
    hiddenTextLines.value = hidden
}

useHead({
    title: data.value.getProductBySlug.meta_title,
    meta: [
        {
            name: 'description',
            content: data.value.getProductBySlug.meta_description,
        },
    ],
})

onMounted(() => {
    if (import.meta.client) {
        executeQuery({
            requestPolicy: 'network-only',
            variables: {slug: productSlug},
        })
    }
})
</script>

<style lang="scss">
.product-page {
    @apply grid grid-cols-1 md:grid-cols-[1fr__max-content] gap-10;
    .create-fields {
        @apply bg-storm-dust-50 p-5 my-5 flex flex-col gap-3;
        h2 {
            @apply text-2xl text-center;
        }
    }
}
</style>
