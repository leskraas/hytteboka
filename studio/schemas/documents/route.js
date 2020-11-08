import { MdLink } from "react-icons/md";

export default {
  name: 'route',
  type: 'document',
  title: 'Route',
  icon: MdLink,
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
    },
    {
      name: 'page',
      type: 'reference',
      description: 'Select the page that this route should point to',
      to: [
        {
          type: 'page',
        },
      ],
    },
  ],
  preview: {
    select: {
      slug: 'slug.current',
      pageTitle: 'page.title',
    },
    prepare({ slug, pageTitle }) {
      return {
        title: slug === '/' ? '/' : `/${slug}`,
        subtitle: `Page: ${pageTitle}`,
      };
    },
  },
};
