import { useQuery } from '@urql/vue'
import { ProductSlugsDocument } from '~/gql/graphql'
import { writeFileSync } from 'fs'
import { createGraphqlClient } from '~/system/createGraphqlClient'

try {
    const client = createGraphqlClient()
    const { data } = await client.query(ProductSlugsDocument, {})

    const slugs = data?.productSlugs || []

    // Сохраняем slug'и в файл
    writeFileSync('./data/product-slugs.json', JSON.stringify(slugs, null, 2))
    console.log('Product slugs fetched and saved to product-slugs.json')
} catch (error) {
    console.error('Error fetching product slugs:', error)
}
