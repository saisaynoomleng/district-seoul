import {formatTitle} from '@district-seoul/utils'
import {IoStorefront} from 'react-icons/io5'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const storeType = defineType({
  name: 'store',
  title: 'Store',
  icon: IoStorefront,
  type: 'document',
  fields: [
    defineField(
      {
        name: 'name',
        title: 'Store Name',
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
      name: 'storeHours',
      title: 'Store Hours',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'storeHour',
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              description: '0 represents Sunday, 1 represents Monday, and so on',
              type: 'number',
            }),
            defineField({
              name: 'openingHour',
              title: 'Opening Hour',
              type: 'string',
            }),
            defineField({
              name: 'closingHour',
              title: 'Closing Hour',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'isOpened',
      title: 'Is the store opened?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'reasonForClosing',
      title: 'Reason For Closing',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Store Photo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'contactInfo',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'image',
      isOpened: 'isOpened',
    },
    prepare({name, image, isOpened}) {
      const nameFormatted = name ? formatTitle(name) : 'Store name not provided'
      const open = isOpened ? 'open' : 'close'

      return {
        title: nameFormatted,
        subtitle: `Open: ${open}`,
        media: image ?? IoStorefront,
      }
    },
  },
})
