import { defineType } from 'sanity';

// Fields derived from https://schema.org/Person
export default defineType({
  name: 'person',
  type: 'object',
  title: 'Person',
  fields: [
    {
      name: 'givenName',
      type: 'string',
      title: 'Fornavn',
      validation: Rule => Rule.required(),
    },
    {
      name: 'familyName',
      type: 'string',
      title: 'Etternavn',
      validation: Rule => Rule.required(),
    },
    {
      name: 'email',
      type: 'string',
      title: 'E-post',
      validation: Rule => Rule.email().required(),
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Telefon',
      validation: Rule => Rule.required(),
    },
    {
      name: 'address',
      type: 'address',
      title: 'Adresse',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Bilde',
    },
    {
      name: 'privacy',
      type: 'privacy-options',
      title: 'Personvern',
      validation: Rule => Rule.required(),
    },
    {
      name: 'worksFor',
      type: 'array',
      title: 'Jobber for',
      description: 'Første selskapet i listen er hovedselskapet',
      of: [
        {
          type: 'object',
          name: 'worksFor',
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
        },
      ],
    },
  ],
});
