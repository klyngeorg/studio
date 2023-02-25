import { HiIdentification } from 'react-icons/hi2';
import { InitialValueResolver, defineType } from 'sanity';

const getCurrentYearRef: InitialValueResolver<
  never,
  { _type: string; _ref: string }
> = async (_, { getClient }) => {
  const year = new Date().getFullYear();
  const client = getClient({ apiVersion: '2021-03-25' });
  const currentMembershipYear = await client.fetch(
    `*[_type == "membershipYear" && year == ${year}]`,
  );

  return {
    // Required _type to tell the schema what fields to map
    _type: 'membershipYear',
    _ref: currentMembershipYear[0]._id,
  };
};

export default defineType({
  name: 'membership',
  type: 'document',
  title: 'Medlemskap',
  icon: HiIdentification,
  preview: {
    select: {
      givenName: 'member.givenName',
      familyName: 'member.familyName',
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
      to: [{ type: 'membershipYear' }],
      validation: Rule => Rule.required(),
      initialValue: getCurrentYearRef,
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
      to: [{ type: 'person' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'payee',
      type: 'reference',
      title: 'Mottaker',
      description:
        'Navn på mottaker av faktura. Dersom ikke valgt, blir faktura sendt til medlemmet direkte',
      to: [{ type: 'organization' }, { type: 'person' }],
    },
  ],
});
