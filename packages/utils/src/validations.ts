import * as z from 'zod';

/**
 * Validate Newsletter Form Schema
 */
export const NewsletterFormSchema = z.object({
  email: z.email('Must be a valid Email Address'),
});
/**
 * Validate Newsletter Form Values
 */
export type NewsletterFormSchemaValues = z.infer<typeof NewsletterFormSchema>;

/**
 * Validate Contact Us Form Schema
 */
export const ContactUsFormSchema = z.object({
  fullName: z.string().min(1, 'Full name must have at least one character'),
  email: z.email('Must be a valid Email Address'),
  phone: z.string().min(1, 'Phone number must have at least 1 character'),
  subject: z.string().min(1, 'Subject must have at least 1 character'),
  message: z
    .string()
    .min(1, 'Message must have at least 1 character')
    .max(3000, 'Message cannot exceed 3000 characters'),
});
/**
 * Validate Contact Us Form Values
 */
export type ContactUsFormSchemaValues = z.input<typeof ContactUsFormSchema>;

/**
 * Validate Create & Edit Author Form Schema
 */
export const AuthorFormSchema = z.object({
  name: z.string().min(1, 'Author name must have at least 1 character'),
  slug: z.string(),
  bioEn: z
    .string()
    .min(1, 'Bio must have at least 1 character')
    .max(10000, 'Bio cannot exceeds 10000 characters'),
  bioKo: z
    .string()
    .min(1, 'Bio must have at least 1 character')
    .max(10000, 'Bio cannot exceeds 10000 characters'),
  imageAssetId: z.string(),
  imageAlt: z
    .string()
    .min(1, 'Image Alternative text must have at least 1 character'),
  socialLink: z.url().nullable(),
  specializedIn: z
    .string()
    .min(1, 'Author Specialization must have at least 1 character'),
});
/**
 * Validate Create & Edit Author Form Values
 */
export type AuthorFormValues = z.input<typeof AuthorFormSchema>;

/**
 * Validate Milestone Form Schema
 */
export const MilestoneFormSchema = z.object({
  nameEn: z
    .string()
    .min(1, 'Milestone in English name must have at least 1 character'),
  nameKo: z
    .string()
    .min(1, 'Milestone in Korean name must have at least 1 character'),
  slug: z.string().min(1, 'Slug must have at least 1 character'),
  year: z.coerce.number().min(1, 'Year must have at least 1 character'),
  bodyEn: z
    .string()
    .min(1, 'Milestone description in English must have at least 1 character')
    .max(
      10000,
      'Milestone description in English cannot exceeds 10000 characters',
    ),
  bodyKo: z
    .string()
    .min(1, 'Milestone description in Korean must have at least 1 character')
    .max(
      10000,
      'Milestone description in Korean cannot exceeds 10000 characters',
    ),
});
/**
 * Validate Milestone Form Values
 */
export type MilestoneFormValues = z.input<typeof MilestoneFormSchema>;

/**
 * Validate Blog Category Form Schema
 */
export const BlogCategoryFormSchema = z.object({
  nameEn: z.string().min(1, 'Name in English must have at least 1 character'),
  nameKo: z.string().min(1, 'Name in Korean must have at least 1 character'),
  slug: z.string().min(1, 'Slug must have at least 1 character'),
});
/**
 * Validate Blog Category Form Values
 */
export type BlogCategoryFormValues = z.input<typeof BlogCategoryFormSchema>;
