import { HiBookOpen } from 'react-icons/hi2';
import { defineType } from 'sanity';

function isDevMode() {
  const devInSearch = window ? window.location.search.includes('dev') : false;
  const devInLocalStorage = localStorage
    ? localStorage.getItem('devMode') === 'true'
    : false;
  const devModeEnabled = devInLocalStorage || devInSearch;
  return devModeEnabled;
}

const isDevelopment = process.env.NODE_ENV === 'development';
const showStatus = !(isDevelopment || isDevMode());

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
      readOnly: ({ document }) => Boolean(document?._id),
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
      readOnly: showStatus,
    },
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'status',
    },
  },
});
