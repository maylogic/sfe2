export const formatPrice = (value: number, fractionDigits: number = 0) => {
    return `${value.toFixed(fractionDigits)} ₽`
}