import { getEnvOrPubVal } from "~/utils/env";
import {
    type ResolvableLink,
    type ResolvableMeta
} from "@unhead/vue/types";

export const getSiteTitle = (title?: string): string => [title, getEnvOrPubVal('SITE_NAME')].filter(i => !!i).join(' | ')
export const getCanonicalUrl = (url: string): string => `https://${getEnvOrPubVal('SITE_DOMAIN')}/${url}`

export const getSeoMeta = (): ResolvableMeta[] => {
    return [
        {name: "mobile-web-app-capable", content: "yes"},
        {name: "theme-color", content: "#fff"},
        {name: "application-name", content: "Safepets"},
        {name: "apple-mobile-web-app-capable", content: "yes"},
        {name: "apple-mobile-web-app-status-bar-style", content: "black-translucent"},
        {name: "apple-mobile-web-app-title", content: "Safepets"},
        {name: "msapplication-TileColor", content: "#fff"},
        {name: "msapplication-TileImage", content: "/mstile-144x144.png"},
        {name: "msapplication-config", content: "/browserconfig.xml"},
    ]
}

export const getSeoLinks = (): ResolvableLink[] => {
    return [
        {rel: "yandex-tableau-widget", href: "/yandex-browser-manifest.json"},
        {rel: "manifest", href: "/manifest.webmanifest"},
        {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
        {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
        {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
        {rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png"},
        {rel: "apple-touch-icon", sizes: "57x57", href: "/apple-touch-icon-57x57.png"},
        {rel: "apple-touch-icon", sizes: "60x60", href: "/apple-touch-icon-60x60.png"},
        {rel: "apple-touch-icon", sizes: "72x72", href: "/apple-touch-icon-72x72.png"},
        {rel: "apple-touch-icon", sizes: "76x76", href: "/apple-touch-icon-76x76.png"},
        {rel: "apple-touch-icon", sizes: "114x114", href: "/apple-touch-icon-114x114.png"},
        {rel: "apple-touch-icon", sizes: "120x120", href: "/apple-touch-icon-120x120.png"},
        {rel: "apple-touch-icon", sizes: "144x144", href: "/apple-touch-icon-144x144.png"},
        {rel: "apple-touch-icon", sizes: "152x152", href: "/apple-touch-icon-152x152.png"},
        {rel: "apple-touch-icon", sizes: "167x167", href: "/apple-touch-icon-167x167.png"},
        {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon-180x180.png"},
        {rel: "apple-touch-icon", sizes: "1024x1024", href: "/apple-touch-icon-1024x1024.png"},

        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            href: "/apple-touch-startup-image-640x1136.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            href: "/apple-touch-startup-image-1136x640.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            href: "/apple-touch-startup-image-750x1334.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            href: "/apple-touch-startup-image-1334x750.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1125x2436.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2436x1125.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1170x2532.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2532x1170.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1179x2556.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2556x1179.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            href: "/apple-touch-startup-image-828x1792.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            href: "/apple-touch-startup-image-1792x828.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1242x2688.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2688x1242.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1242x2208.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2208x1242.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1284x2778.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2778x1284.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1290x2796.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2796x1290.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1488x2266.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2266x1488.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1536x2048.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2048x1536.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1620x2160.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2160x1620.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 820px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1640x2160.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 820px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2160x1640.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1668x2388.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2388x1668.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            href: "/apple-touch-startup-image-1668x2224.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2224x1668.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            href: "/apple-touch-startup-image-2048x2732.png"
        },
        {
            rel: "apple-touch-startup-image",
            media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
            href: "/apple-touch-startup-image-2732x2048.png"
        },
    ]
}