<template>
    <div class="product-page">
        <product-page-gallery @toggle-editor="editor = $event"
                              :text-lines-render-values="textLinesRenderValues"
                              :editor="editor"
                              :line-definitions="product.line_definitions ?? []"
                              :personalize-data="inputData"
                              :reverse-side-base="product.reverse_side_base"
                              :product="product"
                              :gallery="product.gallery"/>
        <div class="flex flex-col">
            <product-info :product="product"/>
            <div class="create-fields">
                <h2 class="font-iskra">Создание и предпросмотр</h2>
                <product-designs @update:design="updateDesign"
                                 :index="getBlockIndex(1)"
                                 :current-design="inputData.design"
                                 :data="product.designs" :valid="personalizeValidity.design"/>
                <product-colors @update:color="updateColor"
                                :key="inputData.design?.id"
                                v-if="availableColors.length"
                                :index="getBlockIndex(2)"
                                :current-color="inputData.color"
                                :data="availableColors" :valid="personalizeValidity.color"/>
                <product-fonts @update:font="updateFont"
                               v-if="availableFonts.length"
                               :key="inputData.design?.id"
                               :index="getBlockIndex(3)"
                               :current-font="inputData.font"
                               :data="availableFonts" :valid="personalizeValidity.font"/>
                <product-text-lines v-if="inputData.design && product.line_definitions"
                                    :errors="textLineErrors"
                                    :hidden="hiddenTextLines"
                                    :values="inputData.textLines"
                                    :data="product.line_definitions" :index="getBlockIndex(4)"
                                    @hide="hideTextLine"
                                    @show="showTextLine"
                                    @update:text-line="updateTextLine"
                                    :valid="personalizeValidity.textLines"/>
                <product-sizes :index="getBlockIndex(5)"
                               :valid="personalizeValidity.size"
                               :current-size="inputData.size"
                               :key="product.key"
                               @update:size="updateSize"
                               v-if="inputData.design !== null"
                               :data="product.sizes"/>
                <product-options v-for="(option,index) in product.options"
                                 :key="product.key"
                                 :errors="optionsErrors"
                                 :index="getBlockIndex(6 + index)"
                                 v-if="inputData.design !== null"
                                 :valid="personalizeValidity.options"
                                 :values="inputData.options"
                                 @update:option="updateOption"
                                 :option="option"/>

                <labeled-price label="Итого:">
                    <block-price class="text-2xl" :key="product.key" :regular="price.regular"
                                 :is_discounted="price.is_discounted" :discounted="price.discounted"/>
                </labeled-price>

                <u-form-group
                    :error="validated && !valid ? 'Пожалуйста, исправьте некоторые ошибки выше. Они помечены красным.' : false">
                    <UButton
                        :label="addingToCart ? 'Добавляем в корзину...' : 'Создать мой адресник'"
                        :disabled="fetching||addingToCart"
                        size="sm"
                        @click="addToCartInternal"
                        class="uppercase font-bebas-neue pt-2 max-w-max text-2xl"
                    />
                </u-form-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    type Color,
    type DesignItemFragment,
    DesignItemFragmentDoc,
    type Font,
    type PersonalizeInput,
    PriceFragmentDoc,
    ProductPageFragmentDoc
} from '~/gql/graphql.js'
import {
    getBlocksVisibility,
    getFullProductPrice,
    getNullValidation,
    getPersonalizeInputFromData,
    type InputTextLinesMap,
    type PersonalizeInputData,
    type PersonalizeLineDefId,
    type PersonalizeValidity,
    validateColor,
    validateDesign,
    validateFont,
    validateOptions,
    validatePerOption,
    validatePerTextLine,
    validateSize,
    validateTextLines
} from "~/utils/product";
import { getKeys } from "~/utils/type"
import {
    type FragmentType,
    useFragment
} from "~/gql";
import {
    generateFontFace,
    getRemoteFontPreloadLink
} from "~/utils/fonts";

const props = defineProps<{
    productFragment: FragmentType<typeof ProductPageFragmentDoc>,
    inputData: PersonalizeInputData,
    addToCart: (productId: string, personalize: PersonalizeInput) => void,
    fetching: boolean,
    addingToCart: boolean
}>()
const product = computed(() => useFragment(ProductPageFragmentDoc, props.productFragment))
const emit = defineEmits(['update:input-data'])

const inputData = reactive<PersonalizeInputData>({
    design: null,
    color: null,
    font: null,
    textLines: new Map<PersonalizeLineDefId, string | null>(),
    size: null,
    options: new Map
})
const textLinesRenderValues = reactive<InputTextLinesMap>(new Map)
const textLineErrors = ref(new Map<PersonalizeLineDefId, string>())
const optionsErrors = ref(new Map<ProductOptionId, string>())
const hiddenTextLines = ref(new Map<PersonalizeLineDefId, boolean>())
const textLinesEditingStarted = ref(false)
const valid = ref(false)
const editor = ref(false)
const validated = ref(false)
const personalizeValidity = reactive<PersonalizeValidity>(getNullValidation())
const blocksVisibility = ref<Map<number, boolean>>(new Map)
const price = ref(useFragment(PriceFragmentDoc, product.value.price))
watch(product, () => {
    price.value = getFullProductPrice(product.value, inputData)
})
const validate = () => {
    personalizeValidity.design = validateDesign(product.value, inputData)
    personalizeValidity.color = validateColor(product.value, inputData)
    personalizeValidity.font = validateFont(product.value, inputData)
    personalizeValidity.textLines = validateTextLines(product.value, inputData)
    personalizeValidity.size = validateSize(product.value, inputData)
    personalizeValidity.options = validateOptions(product.value, inputData)
    textLineErrors.value = validatePerTextLine(product.value, inputData)
    optionsErrors.value = validatePerOption(product.value, inputData)
    valid.value = getKeys(personalizeValidity).every(key => personalizeValidity[key])
    validated.value = true
}
const availableColors = ref<Color[]>([])
const availableFonts = ref<Font[]>([])
const addToCartInternal = () => {
    validate()
    if (valid.value) {
        props.addToCart(product.value.id, getPersonalizeInputFromData(inputData))
    }
}
const updateDesign = (design: DesignItemFragment | null) => {
    validated.value = false
    inputData.design = design
    editor.value = design !== null
    personalizeValidity.design = design ? validateDesign(product.value, inputData) : null
    if (!design?.colors?.find(color => color.id === inputData.color?.id)) {
        inputData.color = null
        personalizeValidity.color = null
    }
    if (!design?.fonts?.find(font => font.id === inputData.font?.id)) {
        inputData.font = null
        personalizeValidity.font = null
    }
    availableColors.value = design?.colors ? [...design?.colors] : []
    availableFonts.value = design?.fonts ? [...design?.fonts] : []
    blocksVisibility.value = getBlocksVisibility(product.value, inputData)
}
const updateColor = (color: Color | null) => {
    validated.value = false
    editor.value = true
    inputData.color = color
    personalizeValidity.color = color ? validateColor(product.value, inputData) : null
}
const updateFont = (font: Font | null) => {
    validated.value = false
    editor.value = true
    inputData.font = font
    personalizeValidity.font = font ? validateFont(product.value, inputData) : null
}
const updateTextLine = (lineId: string, value: string | null) => {
    validated.value = false
    editor.value = true
    if (!textLinesEditingStarted.value) {
        textLinesRenderValues.clear()
        textLinesEditingStarted.value = true
    }
    inputData.textLines.set(lineId, value)
    textLinesRenderValues.set(lineId, value)
    textLineErrors.value = validatePerTextLine(product.value, inputData)
    personalizeValidity.textLines = textLineErrors.value.size === 0 ? true : null
}
const updateSize = (sizeId: ProductSizeId) => {
    validated.value = false
    editor.value = true
    inputData.size = sizeId
    personalizeValidity.size = sizeId ? validateSize(product.value, inputData) : null
    price.value = getFullProductPrice(product.value, inputData)
}
const updateOption = (optionId: ProductOptionId, optionItemId: ProductOptionItemId) => {
    validated.value = false
    editor.value = true
    inputData.options.set(optionId, optionItemId)
    optionsErrors.value = validatePerOption(product.value, inputData)
    if (optionsErrors.value.size === 0) {
        personalizeValidity.options = true
    }
    price.value = getFullProductPrice(product.value, inputData)
}
const setTextLineDefaults = () => {
    product.value.line_definitions?.forEach(def => {
        if (def.default_value) {
            textLinesRenderValues.set(def.id, def.default_value)
        }
    })
}
const hideTextLine = (lineId: string) => {
    inputData.textLines.delete(lineId)
    textLineErrors.value.delete(lineId)
    hiddenTextLines.value.set(lineId, true)
}
const showTextLine = () => {
    for (const def of product.value.line_definitions || []) {
        if (hiddenTextLines.value.has(def.id)) {
            hiddenTextLines.value.delete(def.id)
            return
        }
    }
}

const getBlockIndex = (id: number) => {
    let count = 0;
    for (let i = 1; i <= id; i++) {
        if (blocksVisibility.value.get(i)) {
            count++;
        }
    }
    return count;
}
if (product) {
    const textData = new Map<PersonalizeLineDefId, string | null>(),
        hidden = new Map<PersonalizeLineDefId, boolean>()
    blocksVisibility.value = getBlocksVisibility(product.value, inputData)
    product.value.line_definitions?.forEach(def => {
        textData.set(def.id, null)
        if (def.hidden) {
            hidden.set(def.id, true)
        }
    })
    inputData.textLines = textData
    hiddenTextLines.value = hidden
}

const usedFonts = new Map<string, Font>()
product.value.designs.forEach(designFrag => {
    const design = useFragment(DesignItemFragmentDoc, designFrag)
    design.fonts?.forEach(font => {
        usedFonts.set(font.id, font)
    })
})
setTextLineDefaults()
useHead({
    title: product.value.meta_title,
    meta: [
        {
            name: 'description',
            content: product.value.meta_description,
        },
    ],
    link: [
        ...usedFonts.values().map(font => getRemoteFontPreloadLink(font.filename_woff2))
    ],
    style: [
        {textContent: generateFontFace([...usedFonts.values()])}
    ]
})
</script>

<style lang="scss">
.product-page {
    @apply grid grid-cols-1 max-w-full sm:grid-cols-[max-content__1fr] gap-x-10 gap-y-2;
    .create-fields {
        @apply bg-storm-dust-50 p-5 my-5 flex flex-col gap-3;
        h2 {
            @apply text-2xl text-center;
        }
    }

    .product-info {
        h1 {
            font-size: 32px;
        }
    }
}
</style>
