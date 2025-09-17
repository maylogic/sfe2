import type { ResolvableLink } from "@unhead/vue/types";
import { getStorageUrl } from "~/constants/storage";
import type { FrontendFont } from "~/data/types";
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

export const getRemoteFontPreloadLink = (font: FrontendFont): ResolvableLink => {
    return ({
        rel: 'preload',
        href: `${getRemoteFontUrl(getSuitFontUrl(font))}`,
        as: 'font',
        type: 'font/' + getSuitFontType(font),
        crossorigin: ''
    })
}

export const getRemoteFontUrl = (href: string) => getStorageUrl(href)

export const getLocalFontPreloads = () => {
    return [
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

export const getSuitFontType = (font: Font | FrontendFont) => !!font.filename_otf && 'otf' || !!font.filename_ttf && 'ttf'
export const getSuitFontFormat = (font: Font | FrontendFont) => !!font.filename_otf && 'opentype' || !!font.filename_ttf && 'truetype'
export const getSuitFontUrl = (font: Font | FrontendFont) => font.filename_otf || font.filename_ttf

export const generateFontFace = (fonts: Array<FrontendFont>) => {
    return fonts.map(font => `
          @font-face {
            font-display: block;
            font-family: ${font.name};
            src: url(${getRemoteFontUrl(getSuitFontUrl(font))}) format('${getSuitFontFormat(font)}');
            font-weight: normal;
            font-style: normal;
          }
        `
    ).join('\n');
}