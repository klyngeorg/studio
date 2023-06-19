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
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Aktivt', value: 'active' },
          { title: 'Inaktivt', value: 'inactive' },
        ],
      },
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'status',
    },
  },
});
