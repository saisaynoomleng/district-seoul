import {defineArrayMember, defineField, defineType} from 'sanity'
import {PiFlagBannerFoldFill} from 'react-icons/pi'

export const heroBannerType = defineType({
  name: 'heroBanner',
  title: 'Hero banner',
  type: 'document',
  icon: PiFlagBannerFoldFill,
  fields: [
    defineField({
      name: 'name',
      title: 'Banner Name',
      description: 'Which page is this banner for?',
      validation: (rule) => rule.required(),
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-banner`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'banners',
      title: 'Banners',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'banner',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Banner Title',
              type: 'localeString',
            }),
            defineField({
              name: 'body',
              title: 'Banner Text',
              type: 'localeText',
            }),
            defineField({
              name: 'action',
              title: 'Call to action',
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'localeString',
                }),
                defineField({
                  name: 'href',
                  title: 'Full URL to the page',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'image',
              title: 'Banner Background Image',
              type: 'imageWithAlt',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
})
