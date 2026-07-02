import {defineField, defineType} from 'sanity'
import {IoPencil} from 'react-icons/io5'
import {formatTitle} from '@district-seoul/utils'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: IoPencil,
  fields: [
    defineField({
      name: 'name',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-author`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Author Bio',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Author Photo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialLink',
      title: 'Social Media URL',
      type: 'url',
    }),
    defineField({
      name: 'specializedIn',
      title: 'Specialization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      specializedIn: 'specializedIn',
      image: 'image',
    },
    prepare({name, specializedIn, image}) {
      const nameFormatted = name ? formatTitle(name) : 'Author Name not provided'
      const specializedInFormatted = specializedIn
        ? formatTitle(specializedIn)
        : 'Specialization not provided'

      return {
        title: nameFormatted,
        subtitle: `Specialization: ${specializedInFormatted}`,
        media: image || IoPencil,
      }
    },
  },
})
