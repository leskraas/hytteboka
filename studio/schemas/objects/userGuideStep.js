export default {
    title: 'Steg i brukermanualen',
    name: 'userGuideStep',
    type: 'object',
    fields: [
        {
            title: 'Steg',
            name: 'step',
            type: 'text'
        },
        {
            title: 'Bilde',
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            title: 'Video',
            name: 'video',
            type: 'file'
        }
    ],
    preview: {
        select: {
            title: 'step',
        },
    }
}
