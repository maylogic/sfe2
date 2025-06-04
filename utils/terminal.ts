import { getEnvOrPubVal } from "~/utils/env";

export const getTerminal = (): [string, string] => {
    const prefix = import.meta.dev ? 'DEV' : 'PROD'
    const terminalEnvKey = `${prefix}_TERMINAL`,
        terminalPassEnvKey = `${prefix}_TERMINAL_PASS`
    return [getEnvOrPubVal(terminalEnvKey), getEnvOrPubVal(terminalPassEnvKey)]
}