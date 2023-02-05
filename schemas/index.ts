import member from './member';
import membership from './membership';
import membershipYear from './membership-year';
import address from './objects/address';
import person from './objects/person';
import privacyOptions from './objects/privacy-options';
import worksFor from './objects/works-for';
import organization from './organization';

export const schemaTypes = [
  member,
  address,
  person,
  organization,
  membership,
  membershipYear,
  privacyOptions,
  worksFor,
];
