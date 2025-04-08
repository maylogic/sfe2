import type { ResolvableLink } from "@unhead/vue/types";
import { STORAGE_URL } from "~/constants/storage";

export const getLocalFontPreloadLink = (href: string): ResolvableLink => {
    return ({
        rel: 'preload',
        href: `/fonts/${href}`,
        as: 'font',
        type: 'font/woff2',
        crossorigin: ''
    })
}

export const getRemoteFontPreloadLink = (href: string): ResolvableLink => {
    return ({
        rel: 'preload',
        href: `${STORAGE_URL}/${href}`,
        as: 'font',
        type: 'font/woff2',
        crossorigin: ''
    })
}

export const getLocalFontPreloads = () => {
    return [
        getLocalFontPreloadLink('bebasneuebold.woff2'),
        getLocalFontPreloadLink('FiraSansBlackCyr.woff2'),
        getLocalFontPreloadLink('FiraSansBlackCyrExt.woff2'),
        getLocalFontPreloadLink('FiraSansBlackLat.woff2'),
        getLocalFontPreloadLink('FiraSansBlackLatExt.woff2'),
        getLocalFontPreloadLink('FiraSansBoldCyr.woff2'),
        getLocalFontPreloadLink('FiraSansBoldCyrExt.woff2'),
        getLocalFontPreloadLink('FiraSansBoldLat.woff2'),
        getLocalFontPreloadLink('FiraSansBoldLatExt.woff2'),
        getLocalFontPreloadLink('iskra_medium.woff2'),
    ]
}