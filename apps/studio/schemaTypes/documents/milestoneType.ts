import {defineField, defineType} from 'sanity'
import {GiStairsGoal} from 'react-icons/gi'
import {formatTitle} from '@district-seoul/utils'

export const milestoneType = defineType({
  name: 'milestone',
  title: 'Milestone',
  icon: GiStairsGoal,
  type: 'document',
  fields: [
    defineField(
      {
        name: 'name',
        title: 'Milestone Slogan',
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
      name: 'year',
      title: 'Achievement Year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Description',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name.en',
      year: 'year',
    },
    prepare({name, year}) {
      const nameFormatted = name ? formatTitle(name) : 'No slogan provided'

      return {
        title: nameFormatted,
        year: year ?? '',
      }
    },
  },
})
