export const getEnvOrPubVal = (name: string): string =>
    import.meta.prerender ? process.env[name] ?? '' : useRuntimeConfig().public[snakeToCamel(name.toLowerCase())] as string
const snakeToCamel = (str: string) =>
    str.toLowerCase().replace(/([-_][a-z])/g, group =>
        group.toUpperCase().replace('-', '').replace('_', '')
    )