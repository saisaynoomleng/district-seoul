import {defineArrayMember, defineField, defineType} from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const blockContent = defineType({
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
    }),
    defineArrayMember({
      type: 'imageWithAlt',
    }),
  ],
})

export const socailLink = defineType({
  name: 'socailLink',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      options: {
        list: [
          {title: 'Facebook', value: 'faceboook'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'GitHub', value: 'github'},
          {title: 'Twitter X', value: 'twitterx'},
        ],
        layout: 'dropdown',
      },
    }),
  ],
})

export const localeString = defineType({
  name: 'localeString',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
    defineField({
      name: 'ko',
      title: 'Korean',
      type: 'string',
    }),
  ],
})

export const localeText = defineType({
  name: 'localeText',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
    }),
    defineField({
      name: 'ko',
      title: 'Korean',
      type: 'text',
    }),
  ],
})

export const localeContent = defineType({
  name: 'localeContent',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'blockContent',
    }),
    defineField({
      name: 'ko',
      title: 'Korean',
      type: 'blockContent',
    }),
  ],
})

export const seo = defineType({
  name: 'seo',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localeString',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localeText',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
    }),
  ],
})

export const faq = defineType({
  name: 'faq',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'FAQ title',
      type: 'localeString',
    }),
    defineField({
      name: 'body',
      title: 'FAQ Description',
      type: 'localeText',
    }),
  ],
})

export const measurement = defineType({
  name: 'measurement',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Measurement Label',
      type: 'string',
      options: {
        list: [
          {title: 'Shoulder', value: 'shoulder'},
          {title: 'Chest', value: 'chest'},
          {title: 'Length', value: 'length'},
          {title: 'Sleeve', value: 'sleeve'},
          {title: 'Waist', value: 'waist'},
          {title: 'Hips', value: 'hips'},
          {title: 'Inseam', value: 'inseam'},
          {title: 'Rise', value: 'rise'},
          {title: 'Deck Width', value: 'deck-width'},
          {title: 'Deck Length', value: 'deck-length'},
          {title: 'Wheelbase', value: 'wheel-base'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'value',
      title: 'Measurement Value',
      type: 'string',
    }),
  ],
})

export const contactInfo = defineType({
  name: 'contactInfo',
  type: 'object',
  fields: [
    defineField({
      name: 'email',
      type: 'email',
    }),
    defineField({
      name: 'phone',
      type: 'string',
    }),
    defineField({
      name: 'street',
      type: 'string',
    }),
    defineField({
      name: 'city',
      type: 'string',
    }),
    defineField({
      name: 'zip',
      type: 'string',
    }),
    defineField({
      name: 'state',
      type: 'string',
    }),
    defineField({
      name: 'country',
      type: 'string',
    }),
    defineField({
      name: 'latitude',
      type: 'number',
    }),
    defineField({
      name: 'longitude',
      type: 'number',
    }),
  ],
})
