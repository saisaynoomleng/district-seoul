import {defineArrayMember, defineField, defineType} from 'sanity'
import {RiCustomSize} from 'react-icons/ri'
import {formatTitle} from '@district-seoul/utils'

export const sizeChartType = defineType({
  name: 'sizeChart',
  title: 'Size Chart',
  type: 'document',
  icon: RiCustomSize,
  fields: [
    defineField(
      {
        name: 'name',
        title: 'Size Chart Name',
        type: 'localeString',
        validation: (rule) => rule.required(),
      },
      {aliasFor: 'object'},
    ),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: (doc) => {
          const name = doc.name as {en?: string}
          return name.en ?? ''
        },
      },
    }),
    defineField({
      name: 'sizeDesc',
      title: 'Size Descriptions',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'size',
          type: 'object',
          fields: [
            defineField({
              name: 'lable',
              title: 'Size Label',
              type: 'localeString',
            }),
            defineField({
              name: 'body',
              title: 'Size Description',
              type: 'localeText',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sizes',
      title: 'All Sizes',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'size',
          title: 'Size',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Size Label',
              type: 'string',
            }),
            defineField({
              name: 'measurements',
              title: 'Size Measurements',
              type: 'array',
              of: [{type: 'measurement'}],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Size Chart Image',
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
      const nameFormatted = name ? formatTitle(name) : 'Size Chart name not provided'

      return {
        title: nameFormatted,
        media: image ?? RiCustomSize,
      }
    },
  },
})
