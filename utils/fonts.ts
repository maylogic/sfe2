import type { ResolvableLink } from "@unhead/vue/types";
import { getStorageUrl } from "~/constants/storage";
import type { Font } from "~/gql/graphql";

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
        href: `${getRemoteFontUrl(href)}`,
        as: 'font',
        type: 'font/woff2',
        crossorigin: ''
    })
}

export const getRemoteFontUrl = (href: string) => getStorageUrl(href)

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

export const generateFontFace = (fonts: Array<Pick<Font, 'name' | 'filename_woff2'>>) => {
    return fonts.map(font => `
          @font-face {
            font-family: ${font.name};
            src: url(${getRemoteFontUrl(font.filename_woff2)}) format('woff2');
            font-weight: normal;
            font-style: normal;
          }
        `
    ).join('\n');
}