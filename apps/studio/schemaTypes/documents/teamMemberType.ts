import {defineField, defineType} from 'sanity'
import {FaUsersCog} from 'react-icons/fa'
import {formatTitle} from '@district-seoul/utils'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  icon: FaUsersCog,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Team member name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-team-member`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Member Photo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'position',
      title: 'Member Position',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'image',
      position: 'position',
    },
    prepare({name, position, image}) {
      const nameFormatted = name ? formatTitle(name) : 'Member name not provided'
      const positionFormatted = position ? formatTitle(position) : 'Position not provided'

      return {
        title: nameFormatted,
        subtitle: positionFormatted,
        media: FaUsersCog,
      }
    },
  },
})
