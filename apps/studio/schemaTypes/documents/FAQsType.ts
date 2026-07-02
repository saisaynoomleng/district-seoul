import {defineArrayMember, defineField, defineType} from 'sanity'
import {IoMdChatboxes} from 'react-icons/io'
import {formatTitle} from '@district-seoul/utils'

export const FAQsType = defineType({
  name: 'faqs',
  title: 'FAQs',
  type: 'document',
  icon: IoMdChatboxes,
  fields: [
    defineField(
      {
        name: 'name',
        title: 'FAQs Name',
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
      name: 'faqs',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'title',
          type: 'localeString',
        }),
        defineArrayMember({
          name: 'body',
          type: 'localeText',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name.en',
    },
    prepare({name}) {
      const nameFormatted = name ? formatTitle(name) : 'FAQ Title not provided'

      return {
        title: nameFormatted,
        media: IoMdChatboxes,
      }
    },
  },
})
