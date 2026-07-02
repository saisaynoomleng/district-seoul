import {defineArrayMember, defineField, defineType} from 'sanity'
import {GrWorkshop} from 'react-icons/gr'
import {formatTitle} from '@district-seoul/utils'

export const shopTheLookType = defineType({
  name: 'shopTheLook',
  title: 'Shop The Look',
  type: 'document',
  icon: GrWorkshop,
  fields: [
    defineField(
      {
        name: 'name',
        title: 'Shop the look title',
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
      name: 'body',
      title: 'Shop the look Description Text',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Display Image',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'product',
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{type: 'productVariant'}],
            }),
            defineField({
              name: 'positionXPercent',
              title: 'Horizontal Position on the image in percent',
              type: 'number',
            }),
            defineField({
              name: 'positionYPercent',
              title: 'Vertical Position on the image in percent',
              type: 'number',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'image',
    },
    prepare({name, image}) {
      const title = name ? formatTitle(name) : 'Name not provided'

      return {
        title,
        media: image ?? GrWorkshop,
      }
    },
  },
})
