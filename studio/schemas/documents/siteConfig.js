import { MdSettings } from 'react-icons/md';

export default {
  name: 'site-config',
  type: 'document',
  title: 'Site configuration',
  icon: MdSettings,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Side tittel',
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url',
    },
    {
      name: 'frontpage',
      type: 'reference',
      description: 'Velg hvilken side som er landings siden',
      to: { type: 'page' },
    },
    {
      title: 'Main navigation',
      name: 'mainNavigation',
      description: 'Select pages for the top menu',
      validation: Rule => [
        Rule.max(5).warning('Are you sure you want more than 5 items?'),
        Rule.unique().error('You have duplicate menu items'),
      ],
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'route' }],
        },
      ],
    }
  ],
};
