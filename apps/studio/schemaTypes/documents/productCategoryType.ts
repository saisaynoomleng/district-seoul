import {formatTitle} from '@district-seoul/utils'
import {TbCategoryFilled} from 'react-icons/tb'
import {defineField, defineType} from 'sanity'

export const productCategoryType = defineType({
  name: 'productCategory',
  type: 'document',
  icon: TbCategoryFilled,
  fields: [
    defineField(
      {
        name: 'name',
        title: 'Product Category Name',
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
      name: 'image',
      title: 'Category image',
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
      const nameFormatted = name ? formatTitle(name) : 'Name not provided'

      return {
        title: nameFormatted,
        media: image ?? TbCategoryFilled,
      }
    },
  },
})
