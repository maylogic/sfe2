export const addHours = (hours: number) => {
    return new Date(new Date().setHours(new Date().getHours() + hours))
}

export function convertUtcToLocal(utcDateString: string) {
    const date = new Date(utcDateString)
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
}