import {defineArrayMember, defineField, defineType} from 'sanity'
import {IoMdSettings} from 'react-icons/io'

export const siteSetting = defineType({
  name: 'siteSetting',
  title: 'Site Setting',
  type: 'document',
  icon: IoMdSettings,
  groups: [
    {title: 'Branding', name: 'branding'},
    {title: 'Navigations', name: 'navigation'},
    {title: 'Footer', name: 'footer'},
  ],
  fields: [
    // branding
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'primaryLogo',
      title: 'Primary Logo',
      type: 'imageWithAlt',
      group: 'branding',
    }),
    defineField({
      name: 'secondaryLogo',
      title: 'Secondary Logo',
      type: 'imageWithAlt',
      group: 'branding',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'socialLink'}],
      group: 'branding',
    }),

    // navigations
    defineField({
      name: 'navigation',
      group: 'navigation',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'navLink',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Navigation Label',
              type: 'localeString',
            }),
            defineField({
              name: 'href',
              title: 'Full URL to the page',
              type: 'string',
            }),
            defineField({
              name: 'isButton',
              title: 'Is Button',
              description: 'Render this label as button or plain text?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        }),
        defineArrayMember({
          name: 'navDropdown',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'localeString',
            }),
            defineField({
              name: 'dropdownItems',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'dropdownItem',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Navigation Label',
                      type: 'localeString',
                    }),
                    defineField({
                      name: 'href',
                      title: 'Full URL to the page',
                      type: 'string',
                    }),
                    defineField({
                      name: 'isButton',
                      title: 'Is Button',
                      description: 'Render this label as button or plain text?',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    //footer
    defineField({
      name: 'footerColumns',
      group: 'footer',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'footerColumn',
          type: 'object',
          fields: [
            defineField({
              name: 'columnTitle',
              title: 'Column Title',
              type: 'localeString',
            }),
            defineField({
              name: 'columnLinks',
              title: 'Column Links',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'columnLink',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Link Label',
                      type: 'localeString',
                    }),
                    defineField({
                      name: 'href',
                      title: 'Full URL to the page',
                      type: 'string',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footerText',
      group: 'footer',
      type: 'string',
    }),
  ],
})
