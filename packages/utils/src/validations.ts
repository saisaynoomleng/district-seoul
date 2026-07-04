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
 * Validate Create Author Form Schema
 */
export const CreateAuthorFormSchema = z.object({
  name: z.string().min(1, 'Author name must have at least 1 character'),
  slug: z.string(),
  bioEn: z.string(),
  bioKo: z.string(),
  imageAssetId: z.string(),
  imageAlt: z.string(),
  socialLink: z.url().nullable(),
  specializedIn: z.string(),
});
/**
 * Validate Create Author Form Values
 */
export type CreateAuthorFormValues = z.input<typeof CreateAuthorFormSchema>;
