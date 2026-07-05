'use client';

import {
  ActionResponse,
  BlogCategoryFormSchema,
  BlogCategoryFormValues,
} from '@district-seoul/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BlogCategoryForm } from './BlogCategoryForm';

type EditBlogCategoryFormProps = {
  category: BlogCategoryFormValues;
  action: (
    data: BlogCategoryFormValues,
  ) => Promise<ActionResponse<BlogCategoryFormValues>>;
};

export const EditBlogCategoryForm = ({
  category,
  action,
}: EditBlogCategoryFormProps): React.JSX.Element => {
  const form = useForm<BlogCategoryFormValues>({
    resolver: zodResolver(BlogCategoryFormSchema),
    defaultValues: {
      nameEn: category.nameEn ?? '',
      nameKo: category.nameKo ?? '',
      slug: category.slug ?? '',
    },
  });

  const onSubmit: SubmitHandler<BlogCategoryFormValues> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      return form.setError(result.field as keyof BlogCategoryFormValues, {
        message: result.message,
      });
    }

    toast.success(result.message);
  };

  return (
    <BlogCategoryForm
      form={form}
      onSubmit={onSubmit}
      submitLabel="Edit"
      formTitle="Edit Blog Category"
    />
  );
};
