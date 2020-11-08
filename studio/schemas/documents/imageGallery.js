
export default {
    name: 'image-gallery',
    title: 'Bilde galleri',
    type: 'document',
    fields: [
        {
            name: 'images',
            type: 'array',
            title: 'Bilder',
            of: [{ type: 'image' }],
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Bildegalleri',
                subtitle: 'Fagertun sitt bildegalleri'
            }
        }
    },
}
