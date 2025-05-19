export function parseCookies(cookieHeader: string | undefined): Record<string, string> {
    if (!cookieHeader) return {}

    return cookieHeader
        .split(';')
        .map(c => c.trim())
        .reduce((acc, curr) => {
            const [key, value] = curr.split('=')
            if (key && value) {
                acc[key] = decodeURIComponent(value)
            }
            return acc
        }, {} as Record<string, string>)
}