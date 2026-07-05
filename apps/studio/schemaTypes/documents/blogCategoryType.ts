import {defineField, defineType} from 'sanity'
import {TbCategoryFilled} from 'react-icons/tb'
import {formatTitle} from '@district-seoul/utils'

export const blogCategoryType = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  icon: TbCategoryFilled,
  type: 'document',
  fields: [
    defineField(
      {
        name: 'name',
        title: 'Blog Category Name',
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
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({name}) {
      const nameFormatted = name ? formatTitle(name) : 'Category name not provided'

      return {
        title: nameFormatted,
        media: TbCategoryFilled,
      }
    },
  },
})
