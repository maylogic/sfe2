// Основной ответ от API
export interface DGisSuggestResponse {
    meta: DGisMeta
    result: DGisResult
}

// Метаданные
export interface DGisMeta {
    api_version: string
    code: number
    issue_date: string // формат: "YYYYMMDD"
}

// Результат поиска
export interface DGisResult {
    total: number
    items: DGisSuggestionItem[]
}

// Каждый элемент результата
export interface DGisSuggestionItem {
    type: 'user_query' | 'building'
    full_name?: string
    name?: string
    address_name?: string
    id?: string
    purpose_name?: string
    search_attributes?: DGisSearchAttributes
    address: {
        building_id?: string
        postcode: string
    },
    adm_div: {
        id?: string
        name?: string
        type?: "country" | "region" | "district_area" | "city" | "district"
    }[]
}

export type SuggestionItem = DGisSuggestionItem & { query: string, label: string }

// Поисковые атрибуты
export interface DGisSearchAttributes {
    handling_type: number // например: 2 — частичное совпадение
    suggest_parts: DGisSuggestPart[]
    suggested_text: string
}

// Часть подсказки
export interface DGisSuggestPart {
    is_suggested: boolean
    text: string
}