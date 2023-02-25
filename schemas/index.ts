import event from './event.js';
import membershipYear from './membership-year.js';
import membership from './membership.js';
import address from './objects/address.js';
import offer from './objects/offer.js';
import personLegacy from './objects/person.js';
import privacyOptions from './objects/privacy-options.js';
import worksFor from './objects/works-for.js';
import organization from './organization.js';
import person from './person.js';

export const schemaTypes = [
  offer,
  event,
  address,
  personLegacy,
  person,
  organization,
  membership,
  membershipYear,
  privacyOptions,
  worksFor,
];
