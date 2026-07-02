import {formatTitle} from '@district-seoul/utils'
import {GiSkateboard} from 'react-icons/gi'
import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  icon: GiSkateboard,
  type: 'document',
  fieldsets: [{title: 'References', name: 'references', options: {collapsible: true, columns: 2}}],
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'brand',
      title: 'Product Brand',
      type: 'reference',
      to: [{type: 'brand'}],
      validation: (rule) => rule.required(),
      fieldset: 'references',
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{type: 'productCategory'}],
      fieldset: 'references',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Product Description',
      type: 'localeContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'productVariant'}]}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      brand: 'brand.name',
      category: 'category.name',
      image: 'variants.0.image.0.asset',
    },
    prepare({name, brand, category, image}) {
      const nameFormatted = name ? formatTitle(name) : 'Product name not provided'
      const brandFormatted = brand ? formatTitle(brand) : 'Brand name not provided'
      const categoryFormatted = category ? formatTitle(category) : 'Category not provided'

      return {
        title: nameFormatted,
        subtitle: `Brand: ${brandFormatted} | Category: ${categoryFormatted}`,
        media: image ?? GiSkateboard,
      }
    },
  },
})
