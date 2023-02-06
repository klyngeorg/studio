import { defineType } from 'sanity';

// Derived from https://schema.org/worksFor

export default defineType({
  name: 'works-for',
  type: 'object',
  preview: {
    select: {
      role: 'name',
      organization: 'worksFor.name',
    },
    prepare({ role, organization }) {
      return {
        title: organization,
        subtitle: role,
      };
    },
  },
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Rolle',
      validation: Rule => Rule.required(),
    },
    {
      name: 'worksFor',
      type: 'reference',
      title: 'Selskap',
      to: [{ type: 'organization' }],
    },
  ],
});
