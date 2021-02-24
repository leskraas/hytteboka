import { MdFormatListBulleted } from 'react-icons/md';

export default {
    name: 'userGuide',
    title: 'Brukermanual',
    type: 'document',
    icon: MdFormatListBulleted,
    fields: [
        {
            name: 'title',
            title: 'Tittel',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'URL',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'description',
            title: 'Kort beskrivelse',
            type: 'text'
        },
        {
            name: 'mainImage',
            title: 'Hoved bilde',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            title: 'Steg i brukermanualen',
            name: 'userGuideSteps',
            type: 'array',
            of: [{type: 'userGuideStep'}]
        },
        {
            name: "order",
            title: "Order",
            type: "number",
            hidden: true,
        },
    ],
}
