export const addHours = (hours: number) => {
    return new Date(new Date().setHours(new Date().getHours() + hours))
}
