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
