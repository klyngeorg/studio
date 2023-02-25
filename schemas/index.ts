import event from './event';
import membershipYear from './membership-year';
import membership from './membership';
import address from './objects/address';
import offer from './objects/offer';
import personLegacy from './objects/person';
import privacyOptions from './objects/privacy-options';
import worksFor from './objects/works-for';
import organization from './organization';
import person from './person';

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
