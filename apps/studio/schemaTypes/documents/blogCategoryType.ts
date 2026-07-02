import {defineField, defineType} from 'sanity'
import {TbCategoryFilled} from 'react-icons/tb'
import {formatTitle} from '@district-seoul/utils'

export const blogCategoryType = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  icon: TbCategoryFilled,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Blog Category Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
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
