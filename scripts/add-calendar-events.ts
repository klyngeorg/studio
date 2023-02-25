import * as google from '@googleapis/calendar';
import { SanityImageAssetDocument, createClient } from '@sanity/client';
import { addMonths, subMonths } from 'date-fns';
import { invariant } from 'ts-invariant';
import { config } from '../config.js';
import sanityConfig from '../sanity.cli.js';

interface SanityOffer {
  description?: string;
  price?: number;
  priceCurrency: 'NOK' | 'EUR' | 'USD';
  url?: string;
  availability:
    | 'BackOrder'
    | 'Discontinued'
    | 'InStock'
    | 'OutOfStock'
    | 'PreOrder'
    | 'SoldOut'
    | 'LimitedAvailability';
}

interface SanityEvent {
  calendarId: string;
  name: string;
  date: string;
  eventAttendanceMode:
    | 'OfflineEventAttendanceMode'
    | 'OnlineEventAttendanceMode'
    | 'MixedEventAttendanceMode';
  image?: SanityImageAssetDocument;
  offers?: SanityOffer[];
}

type WithId<T> = T & { _id: string };

function compareEvents(
  sanityEvent: SanityEvent,
  calendarEvent: google.calendar_v3.Schema$Event,
) {
  if (sanityEvent.date !== calendarEvent.start?.dateTime) {
    return false;
  }

  if (sanityEvent.name !== calendarEvent.summary) {
    return false;
  }

  return true;
}

async function addCalendarEvents() {
  invariant(sanityConfig.api);
  const sanityClient = createClient({
    apiVersion: '2021-03-25',
    projectId: sanityConfig.api.projectId,
    dataset: sanityConfig.api.dataset,
    token: process.env.SANITY_TOKEN,
    useCdn: false,
  });

  const sanityData = await sanityClient.fetch<WithId<SanityEvent>[]>(
    '*[_type == "event"]',
  );

  const calendar = google.calendar('v3');

  const timeMin = subMonths(new Date(), 6);
  const timeMax = addMonths(new Date(), 6);

  const events = await calendar.events.list({
    calendarId: config.calendarId,
    auth: config.googleApiKey,
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',

    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),

    timeZone: 'Europe/Oslo',
  });

  if (!events.data.items) {
    return;
  }

  // Add events to Sanity
  for await (const event of events.data.items) {
    // Check if it already exists in Sanity
    const sanityEvent = sanityData.find(
      sanityEvent => sanityEvent.calendarId === event.id,
    );

    if (sanityEvent) {
      if (compareEvents(sanityEvent, event)) {
        await sanityClient.patch(sanityEvent._id).set({
          date: event.start?.dateTime,
          name: event.summary,
        });
      }

      continue;
    }

    if (event.start) {
      invariant(event.id, 'extect event.id to be defined');
      invariant(event.summary, 'expect event.summary to be defined');
      invariant(
        event.start?.dateTime,
        'expect event.start.dateTime to be defined',
      );

      // Add event to Sanity
      await sanityClient.create<SanityEvent>({
        _type: 'event',
        calendarId: event.id,
        name: event.summary,
        date: event.start.dateTime,
        eventAttendanceMode: 'OfflineEventAttendanceMode',
      });
    }
  }
}

await addCalendarEvents();
