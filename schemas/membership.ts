import { defineType } from 'sanity';

export default defineType({
  name: 'membership',
  type: 'document',
  title: 'Medlemskap',
  preview: {
    select: {
      givenName: 'member.person.givenName',
      familyName: 'member.person.familyName',
      year: 'year.year',
      status: 'status',
    },
    prepare({ givenName, familyName, status, year }) {
      return {
        title: `${givenName} ${familyName}`,
        subtitle: `${status} – medlemsår: ${year}`,
      };
    },
  },
  orderings: [
    {
      name: 'year',
      title: 'År',
      by: [{ field: 'year.year', direction: 'desc' }],
    },
    // Sort by status
    {
      name: 'status',
      title: 'Status',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
  fields: [
    {
      name: 'year',
      type: 'reference',
      to: [{ type: 'membership-year' }],
      validation: Rule => Rule.required(),
      // Default to current year
      initialValue: {
        // Required _type to tell the schema what fields to map
        _ref: '93015e4a-7250-4155-b78a-ea4b7ab13bb9',
      },
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Venter', value: 'pending', default: true },
          { title: 'Venter på fakturering', value: 'pending-invoicing' },
          { title: 'Venter på betaling', value: 'pending-payment' },
          { title: 'Aktiv', value: 'active' },
          { title: 'Utskrevet', value: 'expelled' },
          { title: 'Venter på utskrivning', value: 'pending-expelled' },
        ],
      },
      initialValue: 'pending',
      validation: Rule => Rule.required(),
    },
    {
      name: 'member',
      type: 'reference',
      to: [{ type: 'member' }],
      validation: Rule => Rule.required(),
    },
  ],
});
