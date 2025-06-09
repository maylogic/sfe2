import { createGraphqlClient } from "~/system/createGraphqlClient";
import { ProductsFeedDocument } from "~/gql/graphql";
import { getCanonicalUrl } from "~/utils/seo";
import { getStorageUrl } from "~/constants/storage";
import { getEnvOrPubVal } from "~/utils/env";

export default defineEventHandler(async (event) => {
    // Пример данных о товарах
    const products = await getProducts()

    const xmlItems = products?.map(product => {
        const image = product.gallery.find(item => !item.is_video)
        return `
    <item>
      <title>${escapeXml(product.meta_title)}</title>
      <link>${escapeXml(getCanonicalUrl(`product/${product.slug}`))}</link>
      <description>${escapeXml(product.meta_description)}</description>
      ${image ? `<g:image_link>${escapeXml(getStorageUrl(image.filename))}</g:image_link>` : ''}
      <g:price>${product.price.regular} RUB</g:price>
      ${product.price.is_discounted ? `<g:sale_price>{{ product.price.discounted }} RUB</g:sale_price>` : ''}
      <g:id>${product.sku}</g:id>
      <g:availability>in_stock</g:availability>
      <g:brand>${escapeXml('Safepets')}</g:brand>
      <g:google_product_category>${escapeXml('Pet Supplies > Pet ID Tags')}</g:google_product_category>
    </item>
  `
    }).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Магазин Safepets</title>
    <link>https://${getEnvOrPubVal('SITE_DOMAIN')}</link> 
    <description>Товары магазина Safepets</description>
    ${xmlItems}
  </channel>
</rss>`;

    event.node.res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return xml;
});

// Экранирование XML
function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => ({
        '<': '<',
        '>': '>',
        '&': '&amp;',
        "'": '&apos;',
        '"': '&quot;'
    }[c] || c));
}

const getProducts = async () => {
    const client = createGraphqlClient()

    try {
        const data = await client.query(
            ProductsFeedDocument,
            {
                first: 10,
                page: 1
            }
        )
        return data.data?.products.data
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при получении данных'
        })
    }
}