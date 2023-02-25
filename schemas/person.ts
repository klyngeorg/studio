import { HiUserCircle } from 'react-icons/hi2';
import { defineType } from 'sanity';

export default defineType({
  name: 'person',
  type: 'document',
  icon: HiUserCircle,
  title: 'Person',
  preview: {
    select: {
      givenName: 'givenName',
      familyName: 'familyName',
      company: 'worksFor.0.worksFor.name',
      role: 'worksFor.0.name',
      media: 'image',
    },
    prepare({ givenName, familyName, company, media, role }) {
      return {
        title: `${givenName} ${familyName}`,
        subtitle: `${role} @ ${company}`,
        media,
      };
    },
  },
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
      options: { hotspot: true },
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
      of: [{ type: 'works-for' }],
    },
  ],
});
