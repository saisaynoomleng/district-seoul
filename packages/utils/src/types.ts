/**
 * Standard Image Types
 * imageUrl: string;
 * imageAlt: string;
 */
export type Media = {
  imageUrl: string;
  imageAlt: string;
};

/**
 * Form Returned data types
 * success — boolean; whether form submission is sucess or not,
 * message — string; form return message,
 * field — keyof Form fields
 */
export type ActionResponse<Tvalues> = {
  success: boolean;
  message: string;
  field?: keyof Tvalues;
};
