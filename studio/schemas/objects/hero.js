export default {
  type: 'object',
  name: 'hero',
  title: 'Hero',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Tittel',
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Bakrunsbilde',
      options: {
        hotspot: true,
      },
    }
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'IHero section',
        media,
      };
    },
  },
};
