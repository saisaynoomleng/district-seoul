import {defineField, defineType} from 'sanity'
import {SiNike} from 'react-icons/si'
import {formatTitle} from '@district-seoul/utils'

export const brandType = defineType({
  name: 'brand',
  title: 'Brand',
  icon: SiNike,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'image',
      title: 'Brand Logo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'image',
    },
    prepare({name, image}) {
      const nameFormatted = name ? formatTitle(name) : 'Brand name not provided'

      return {
        title: nameFormatted,
        media: image ?? SiNike,
      }
    },
  },
})
