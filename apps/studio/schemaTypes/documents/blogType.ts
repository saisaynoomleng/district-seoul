import {formatDate, formatTitle} from '@district-seoul/utils'
import {IoNewspaper} from 'react-icons/io5'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: IoNewspaper,
  fieldsets: [
    {
      title: 'references',
      name: 'references',
      options: {collapsed: false, collapsible: true, columns: 2},
    },
  ],
  fields: [
    defineField(
      {
        name: 'name',
        title: 'Blog Title',
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
          return name?.en ?? ''
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      fieldset: 'references',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Blog Category',
      type: 'reference',
      to: [{type: 'blogCategory'}],
      fieldset: 'references',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'minRead',
      title: 'Reading Duration In minutes',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short Summary of the blog',
      type: 'localeText',
    }),
    defineField({
      name: 'body',
      title: 'Blog Text',
      type: 'localeContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Blog Cover Photo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Required while sharing a blog on social media',
      type: 'seo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Blog?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isMemberOnly',
      title: 'Member Only Blog?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'comments',
      title: 'Blog Comments',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'username',
              type: 'string',
            }),
            defineField({
              name: 'body',
              type: 'text',
            }),
            defineField({
              name: 'commentedAt',
              type: 'date',
              initialValue: new Date().toISOString().slice(0, 10),
            }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
    {
      title: 'Featured',
      name: 'byFeatured',
      by: [{field: 'isFeatured', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      name: 'name.en',
      publishedAt: 'publishedAt',
      category: 'category.name',
      image: 'image',
    },
    prepare({name, publishedAt, category, image}) {
      const nameFormatted = name ? formatTitle(name) : 'Title not provided'
      const dateFormatted = publishedAt ? formatDate(publishedAt) : 'No published Date'
      const categoryFormatted = category ? formatTitle(category) : 'Category not specified'

      return {
        title: nameFormatted,
        subtitle: `Category: ${categoryFormatted} | Date: ${dateFormatted}`,
        media: image ?? IoNewspaper,
      }
    },
  },
})
