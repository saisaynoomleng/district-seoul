import {formatKoreanCurrency, formatTitle, formatUSCurrency} from '@district-seoul/utils'
import {GiSkateboard} from 'react-icons/gi'
import {defineField, defineType} from 'sanity'
import {ColorStringInput} from 'sanity-plugin-block-styles'

export const productVariantType = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  icon: GiSkateboard,
  fields: [
    defineField({
      name: 'name',
      title: 'Variant Name',
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
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceInUsd',
      title: 'Price in USD',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceInKrw',
      title: 'Price in Korean Won',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'discountInPercent',
      title: 'Discount in Percent',
      type: 'number',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'Extra Small', value: 'xs'},
          {title: 'Small', value: 's'},
          {title: 'Medium', value: 'm'},
          {title: 'Large', value: 'l'},
          {title: 'Extra Large', value: 'xl'},
          {title: 'Extra Extra Large', value: '2xl'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      components: {input: ColorStringInput},
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'imageWithAlt'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      priceInKrw: 'priceInKrw',
      priceInUsd: 'priceInUsd',
      image: 'images.0.asset',
      size: 'size',
    },
    prepare({name, priceInKrw, priceInUsd, image, size}) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided'
      const krw = priceInKrw ? formatKoreanCurrency(priceInKrw) : 'Price in KRW not provided'
      const usd = priceInUsd ? formatUSCurrency(priceInUsd) : 'Price in USD not provided'
      const sizeFormatted = size ? size : ''

      return {
        title: nameFormatted,
        subtitle: `Price: ${usd} | ${krw}, Size: ${sizeFormatted}`,
        media: image ?? GiSkateboard,
      }
    },
  },
})
