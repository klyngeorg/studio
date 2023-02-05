import { defineType } from 'sanity';

export default defineType({
  name: 'privacy-options',
  type: 'object',
  title: 'Personvernvalg',
  fields: [
    {
      name: 'showPublicly',
      type: 'boolean',
      title: 'Vis offentlig',
      description:
        'Hvis dette er valgt, vil medlemmet/selskap vises på medlemslisten',
      initialValue: false,
      validation: Rule => Rule.required(),
    },
  ],
});
