export const formatPrice = (value: number) => {
    return value ? `${value.toFixed(0)} ₽` : 'N/A'
}
