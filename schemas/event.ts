import { format } from 'date-fns';
import { HiCalendar } from 'react-icons/hi2';
import { defineType } from 'sanity';

export default defineType({
  title: 'Arrangement',
  name: 'event',
  type: 'document',
  icon: HiCalendar,
  description: [
    'Arrangementer opprettes i felles kalender, og synkroniseres til Sanity.',
    'Opplysninger som ikke kan legges inn i Google Calender legges derfor inn',
    'her.',
  ].join(' '),
  preview: {
    select: {
      title: 'name',
      subtitle: 'date',
    },
  },
  orderings: [
    {
      title: 'Dato, neste først',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Dato, siste først',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  fields: [
    {
      title: 'Kalender ID',
      name: 'calendarId',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      title: 'Navn',
      name: 'name',
      type: 'string',
      readOnly: true,
      description: [
        'Arrangementer opprettes i felles kalender, og synkroniseres til Sanity.',
        'Opplysninger som navn, beskrivelse, sted og tidspunkter legges derfor inn der',
        'Dersom du ønsker å endre noe av dette, må du endre det i kalenderen.',
      ].join(' '),
    },
    {
      title: 'Dato',
      name: 'date',
      type: 'datetime',
      readOnly: true,
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'VIKTIG: For å lage underside, må det legges inn en slug.',
      options: {
        source: document =>
          [
            document.date
              ? format(new Date(document.date as string), 'yyyy-MM-dd')
              : '',
            document.name,
          ].join('-'),
        maxLength: 96,
        unique: true,
      },
    },
    {
      name: 'eventAttendanceMode',
      title: 'Oppmøtemodus',
      type: 'string',
      // Only allow one of the following options.
      // Read more here: https://schema.org/EventAttendanceModeEnumeration
      options: {
        list: [
          { title: 'Fysisk', value: 'OfflineEventAttendanceMode' },
          { title: 'Digitalt', value: 'OnlineEventAttendanceMode' },
          { title: 'Begge deler', value: 'MixedEventAttendanceMode' },
        ],
      },
    },
    {
      title: 'Bilde',
      description:
        'Bilde som vises på sosiale medier. Størrelse 1200 x 675. Dersom dette ikke er angitt, brukes et standard bilde (eksempel: https://klyngeorg.no/assets/images/social/2023-01-11-klynge.png)',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Tilbud',
      name: 'offers',
      type: 'array',
      of: [{ type: 'offer' }],
    },
    {
      name: 'performers',
      title: 'Innleggsholdere',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
  ],
  initialValue: {
    eventAttendanceMode: 'OfflineEventAttendanceMode',
  },
});
