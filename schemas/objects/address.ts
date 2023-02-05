// Schema derived from https://schema.org/PostalAddress

import { defineType } from 'sanity';

export default defineType({
  name: 'address',
  type: 'object',
  title: 'Adresse',
  fields: [
    {
      name: 'streetAddress',
      type: 'string',
      title: 'Gateadresse',
    },
    {
      name: 'postalCode',
      type: 'string',
      title: 'Postnummer',
      validation: Rule =>
        Rule.regex(/^\d{4}$/).error('Postnummeret må være på formatet 0000'),
    },
    {
      name: 'addressLocality',
      type: 'string',
      title: 'Poststed',
    },
  ],
});
