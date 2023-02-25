import { HiUserCircle } from 'react-icons/hi2';
import { defineType } from 'sanity';

export default defineType({
  name: 'member',
  type: 'document',
  icon: HiUserCircle,
  title: 'Medlem (legacy)',
  preview: {
    select: {
      givenName: 'person.givenName',
      familyName: 'person.familyName',
      company: 'person.worksFor.0.worksFor.name',
      role: 'person.worksFor.0.name',
      media: 'person.image',
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
      name: 'person',
      type: 'person',
      title: 'Person',
    },
    // Section for payment details
    {
      name: 'payee',
      type: 'reference',
      title: 'Mottaker',
      description:
        'Navn på mottaker av faktura. Dersom ikke valgt, blir faktura sendt til medlemmet direkte',
      to: [{ type: 'organization' }],
    },
  ],
});
