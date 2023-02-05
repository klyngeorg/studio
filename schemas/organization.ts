// Schema derived from https://schema.org/Organization
import { defineType } from 'sanity';
import { verifyOrganisationNumber } from 'norwegian-numbers';

export default defineType({
  name: 'organization',
  type: 'document',
  title: 'Organisasjon',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Navn',
      validation: Rule => Rule.required(),
    },
    {
      name: 'legalName',
      type: 'string',
      title: 'Juridisk navn',
    },
    {
      name: 'email',
      type: 'string',
      title: 'E-post',
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Telefon',
    },
    {
      name: 'address',
      type: 'address',
      title: 'Adresse',
    },
    // VAT number
    {
      name: 'vatID',
      type: 'string',
      title: 'MVA-nummer',
      validation: Rule =>
        Rule.required().custom(value => {
          const isValid = verifyOrganisationNumber(String(value).trim());
          if (isValid) {
            return true;
          }

          return 'Ugyldig organisasjonsnummer';
        }),
    },
    {
      name: 'privacy',
      type: 'privacy-options',
      title: 'Personvern',
      validation: Rule => Rule.required(),
    },
    {
      name: 'sameAs',
      type: 'array',
      title: 'Samme som',
      description:
        'Link til andre nettsteder som representerer organisasjonen.',
      of: [
        {
          type: 'string',
          validation: Rule => Rule.uri({ scheme: ['http', 'https'] }),
        },
      ],
    },
  ],
});
