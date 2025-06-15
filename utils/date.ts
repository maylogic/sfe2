export const addHours = (hours: number) => {
    return new Date(new Date().setHours(new Date().getHours() + hours))
}

export function convertUtcToLocal(utcDateString: string) {
    const date = new Date(utcDateString)
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
}

const formatter = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
})

export const formatDate = (date: Date) => formatter.format(date);