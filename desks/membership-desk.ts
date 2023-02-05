import { HiBuildingOffice, HiUserCircle, HiViewColumns } from 'react-icons/hi2';
import { deskTool } from 'sanity/desk';

export const membershipDesk = deskTool({
  name: 'membership',
  title: 'Medlemskap',
  structure: (S, context) =>
    S.list()
      .title('Medlemskap')
      .items([
        S.listItem()
          .title('Medlemskap sortert etter år')
          .icon(HiViewColumns)
          .child(async () => {
            const client = context.getClient({ apiVersion: '2021-03-25' });
            const docs = await client.fetch<
              { _id: string; _type: string; year: { year: number } }[]
            >(
              `
                    * [_type == "membership" && defined(year)]{
                      _id,
                      _type,
                      year->{
                        year
                      }
                    }
                  `,
            );

            const yearsMap = new Map<number, string>();
            docs.forEach(({ year: { year }, _id }) => {
              if (!yearsMap.has(year)) {
                yearsMap.set(year, _id);
              }
            });

            return S.list()
              .title('Medlemmer etter år')
              .id('year')
              .items(
                Array.from(yearsMap).map(([year, _id]) => {
                  return S.listItem()
                    .id(String(year))
                    .title(String(year))
                    .child(
                      S.documentList()
                        .id('membership')
                        .title(`Medlemskap i ${year}`)
                        .filter('year->year == $year')
                        .params({ year }),
                    );
                }),
              );
          }),
        S.documentTypeListItem('member').title('Medlemmer').icon(HiUserCircle),
        S.documentTypeListItem('organization')
          .title('Organisasjoner')
          .icon(HiBuildingOffice),
      ]),
});
