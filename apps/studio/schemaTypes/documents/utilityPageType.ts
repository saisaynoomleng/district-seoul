import {defineField, defineType} from 'sanity'
import {RiPagesFill} from 'react-icons/ri'
import {formatTitle} from '@district-seoul/utils'

export const utilityPageType = defineType({
  name: 'utilityPage',
  type: 'document',
  icon: RiPagesFill,
  fields: [
    defineField(
      {
        name: 'name',
        title: 'Page Name',
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
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Page Text',
      type: 'localeContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name.en',
    },
    prepare({name}) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided'

      return {
        title: nameFormatted,
        media: RiPagesFill,
      }
    },
  },
})
