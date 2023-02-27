// Schema derived from https://schema.org/Offer
import { defineType } from 'sanity';

export default defineType({
  name: 'offer',
  type: 'object',
  title: 'Tilbud',
  description:
    'Tilbud i denne sammenheng er eksempelvis kostnad for påmelding, kursavgift, etc.',
  preview: {
    select: {
      title: 'description',
      price: 'price',
      currency: 'priceCurrency',
    },
    prepare({ title, price, currency }) {
      return {
        title: title,
        subtitle: `${price} ${currency}`,
      };
    },
  },
  fields: [
    {
      name: 'description',
      type: 'text',
      title: 'Beskrivelse',
      description:
        'For å forklare hva tilbudet er. Eksempelvis, at det er kursavgift eller mat',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Pris',
    },
    {
      name: 'priceCurrency',
      type: 'string',
      title: 'Valuta',
      options: {
        list: [
          { title: 'NOK', value: 'NOK' },
          { title: 'EUR', value: 'EUR' },
          { title: 'USD', value: 'USD' },
        ],
      },
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'Eksempelvis til påmelding, kursside, etc.',
    },
    {
      name: 'availability',
      type: 'string',
      title: 'Tilgjengelighet',
      // Only allow one of the following options.
      // Read more here: https://schema.org/ItemAvailability
      options: {
        list: [
          { title: 'Venteliste', value: 'BackOrder' },
          { title: 'Avviklet', value: 'Discontinued' },
          { title: 'På lager / Ledige plasser', value: 'InStock' },
          { title: 'Ikke på lager', value: 'OutOfStock' },
          { title: 'Forhåndsbestilling', value: 'PreOrder' },
          { title: 'Utsolgt / Fullt', value: 'SoldOut' },
          {
            title: 'Begrenset / Begrensede plasser',
            value: 'LimitedAvailability',
          },
        ],
      },
    },
  ],
  initialValue: {
    priceCurrency: 'NOK',
    availability: 'InStock',
  },
});
