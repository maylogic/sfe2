import dogTagsData from '~/data/source/dog_tags.json' with { type: 'json' };
import {basename} from 'path'

type MinimalTemplateElement = { template_id: number, class: "template" | "label" | "font" | "texts" }
type ElementsData = {
    template: Array<MinimalTemplateElement>,
    label: Array<MinimalTemplateElement>,
    font: Array<MinimalTemplateElement>,
    texts: Array<MinimalTemplateElement>,
    invitations: Array<MinimalTemplateElement>,
    "stick-on": Array<MinimalTemplateElement>
}
export default defineEventHandler(() => {
    const keys = Object.keys(dogTagsData.props.pageProps.initialApolloState)
    const elements = new Map<number, ElementsData>,
        svgFileNameToTemplateId = new Map<string, number>
    keys.forEach(key => {
        if (key.startsWith('PersonalizeTemplateElement:')) {
            const el = dogTagsData.props.pageProps.initialApolloState[key] as MinimalTemplateElement
            const templateElements = elements.get(el.template_id) ?? {
                template: [],
                label: [],
                font: [],
                texts: [],
                invitations: [],
                "stick-on": []
            } as ElementsData
            templateElements[el.class].push(el)
            if (el.class === 'label') {
                svgFileNameToTemplateId.set(basename(el.style.imageUrl) as string, el.template_id)
            }
            elements.set(el.template_id, templateElements)
        }
    })

    const needle =
        elements.get(
            Number(
                svgFileNameToTemplateId.get('LOVE-TATTOO-Mini-Dog-Tag-Designer-Download_SVGs.svg')
            )
        )
    return [
        needle.texts
    ];
});