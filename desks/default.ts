import {
  HiBuildingOffice,
  HiCalendar,
  HiIdentification,
  HiUserCircle,
} from 'react-icons/hi2';
import { deskTool } from 'sanity/desk';

export const defaultDesk = deskTool({
  structure: S =>
    S.list()
      .title('Innhold')
      .items([
        S.listItem()
          .title('Kommende arrangementer')
          .icon(HiCalendar)
          .child(
            S.documentList()
              .title('Kommende arrangementer')
              .filter('_type == "event" && dateTime(date) > dateTime(now())')
              .defaultOrdering([{ field: 'date', direction: 'asc' }])
              .menuItems(S.documentTypeList('event').getMenuItems()),
          ),
        S.listItem()
          .title('Aktive medlemskap')
          .icon(HiIdentification)
          .child(
            S.documentList()
              .title('Medlemskap')
              .filter('_type == "membership" && year->status == "active"')
              .defaultOrdering([{ field: 'year', direction: 'desc' }])
              .menuItems(S.documentTypeList('membership').getMenuItems()),
          ),
        S.listItem()
          .title('Personer')
          .icon(HiUserCircle)
          .child(
            S.documentList()
              .title('Personer')
              .filter('_type == "person"')
              .defaultOrdering([{ field: 'givenName', direction: 'asc' }])
              .menuItems(S.documentTypeList('membership').getMenuItems()),
          ),
        S.listItem()
          .title('Organisasjoner')
          .icon(HiBuildingOffice)
          .child(
            S.documentList()
              .title('Organisasjoner')
              .filter('_type == "organization"')
              .defaultOrdering([{ field: 'givenName', direction: 'asc' }])
              .menuItems(S.documentTypeList('membership').getMenuItems()),
          ),
      ]),
});
