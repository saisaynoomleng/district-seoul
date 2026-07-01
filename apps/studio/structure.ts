import {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('District Seoul')
    .items([S.divider().title('Operations')])
