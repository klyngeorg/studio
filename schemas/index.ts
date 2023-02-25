import event from './event.js';
import member from './member.js';
import membershipYear from './membership-year.js';
import membership from './membership.js';
import address from './objects/address.js';
import offer from './objects/offer.js';
import person from './objects/person.js';
import privacyOptions from './objects/privacy-options.js';
import worksFor from './objects/works-for.js';
import organization from './organization.js';

export const schemaTypes = [
  offer,
  event,
  member,
  address,
  person,
  organization,
  membership,
  membershipYear,
  privacyOptions,
  worksFor,
];
