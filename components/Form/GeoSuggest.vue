<template>
    <span class="font-fira-sans text-sm">Начните вводить город и адрес в поле «адрес дома», затем выберите подходящий адрес из подсказок, чтобы быстро заполнить остальные поля</span>
    <u-form-group class="suggestions-container" name="address1" label="Адрес дома">
        <u-input @keyup="suggest" autocomplete="none" name="address1"
                 :model-value="modelValue" @update:modelValue="emit('update:modelValue', $event)"/>
        <transition name="fade-in" v-show="showSuggestions">
            <div class="suggestions">
                <div class="suggestion-item" @click="selectSuggestion(item)" v-for="item in suggestions">
                    <span><b>{{ item.query }}</b>{{ item.label }}</span>
                </div>
            </div>
        </transition>
    </u-form-group>
</template>
<script setup lang="ts">
import type { AddressFormState } from "~/data/types";
import type {
    DGisSuggestionItem,
    DGisSuggestResponse,
    SuggestionItem
} from "~/types/geosuggest";

const SUGGEST_URL = 'https://catalog.api.2gis.com/3.0/suggests?fields=items.address,items.adm_div&suggest_type=address&key=1614b16a-316b-4558-b5af-62b8327148b5&q='
const emit = defineEmits(['selected', 'update:modelValue'])
const props = defineProps<{
    modelValue: AddressFormState['address1'],
}>()

const suggestions = ref<SuggestionItem[]>([]),
    showSuggestions = ref(false)

const selectSuggestion = (item: SuggestionItem) => {
    emit('selected', item)
    showSuggestions.value = false
}

const suggest = useDebounceFn(async () => {
    const items = await fetchSuggestions(props.modelValue)
    const dropdownItems: SuggestionItem[] = []
    items.forEach(item => {
        if (item.search_attributes && item.adm_div && item.address?.postcode) {
            let query = '', label = ''
            item.search_attributes.suggest_parts.forEach(part => {
                if (part.is_suggested) label += part.text
                else query += part.text
            })
            dropdownItems.push({...item, query, label})
        }
    })
    suggestions.value = dropdownItems
    showSuggestions.value = true
}, 300)

const fetchSuggestions = async (searchQuery: AddressFormState['address1']): Promise<DGisSuggestionItem[]> => {
    if (!searchQuery?.trim()) return []

    const url = SUGGEST_URL + searchQuery

    try {
        const res = await fetch(url)
        const data: DGisSuggestResponse = await res.json()

        return data?.result?.items || []
    } catch (error) {
        console.error('Ошибка при получении подсказок:', error)
        return []
    }
}
</script>
<style lang="scss">
.suggestions-container {
    @apply relative;
    .suggestions {
        @apply absolute left-0 bg-storm-dust-50 z-10 overflow-y-auto max-h-72;
        @apply rounded-b-md;
        .suggestion-item {
            @apply px-4 py-2 cursor-pointer hover:bg-storm-dust-100 text-sm;
        }
    }
}
</style>