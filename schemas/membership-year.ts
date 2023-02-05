import { defineType } from 'sanity';

export default defineType({
  name: 'membership-year',
  type: 'document',
  title: 'Medlemskapsår',
  fields: [
    {
      name: 'year',
      type: 'number',
      title: 'År',
      validation: Rule => Rule.unique().required(),
      // Default to current year
      initialValue: new Date().getFullYear(),
    },
  ],
});
