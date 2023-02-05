import { HiBookOpen } from 'react-icons/hi2';
import { defineType } from 'sanity';

export default defineType({
  name: 'membershipYear',
  type: 'document',
  title: 'Medlemskapsår',
  icon: HiBookOpen,
  fields: [
    {
      name: 'year',
      type: 'number',
      title: 'År',
      validation: Rule => Rule.required(),
      // Default to current year
      initialValue: new Date().getFullYear(),
    },
  ],
});
