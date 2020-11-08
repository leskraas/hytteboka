import { MdDashboard } from 'react-icons/md';

export default {
    name: 'page',
    title: 'Sider',
    type: 'document',
    icon: MdDashboard,
    fields: [
        {
            name: 'title',
            title: 'Tittel',
            type: 'string'
        },
        {
            name: 'content',
            type: 'array',
            title: 'Page sections',
            of: [
                { type: 'hero' },
                { type: 'textSection' },
            ],
        },
    ]
}
