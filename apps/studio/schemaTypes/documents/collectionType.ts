import {defineField, defineType} from 'sanity'
import {VscCollection} from 'react-icons/vsc'
import {formatTitle} from '@district-seoul/utils'

export const collectionType = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: VscCollection,
  fields: [
    defineField(
      {
        name: 'name',
        title: 'Collection Name',
        type: 'localeString',
        validation: (rule) => rule.required(),
      },
      {aliasFor: 'object'},
    ),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => {
          const name = doc.name as {en?: string}
          return name.en ?? ''
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Collection Description Text',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Collection Photo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Proucts in the collection',
      type: 'array',
      of: [{type: 'productVariant'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'image',
    },
    prepare({name, image}) {
      const nameFormatted = name ? formatTitle(name) : 'Collection Name not provided'

      return {
        title: nameFormatted,
        media: image ?? VscCollection,
      }
    },
  },
})
