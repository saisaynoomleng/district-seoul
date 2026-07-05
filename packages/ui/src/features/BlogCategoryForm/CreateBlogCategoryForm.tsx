'use client';

import {
  ActionResponse,
  BlogCategoryFormSchema,
  BlogCategoryFormValues,
} from '@district-seoul/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BlogCategoryForm } from './BlogCategoryForm';

type CreateBlogCategoryFormProps = {
  action: (
    data: BlogCategoryFormValues,
  ) => Promise<ActionResponse<BlogCategoryFormValues>>;
};

export const CreateBlogCategoryForm = ({
  action,
}: CreateBlogCategoryFormProps): React.JSX.Element => {
  const form = useForm<BlogCategoryFormValues>({
    resolver: zodResolver(BlogCategoryFormSchema),
    defaultValues: {
      nameEn: '',
      nameKo: '',
      slug: '',
    },
  });

  const onSubmit = async (data: BlogCategoryFormValues) => {
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
      formTitle="Create Blog Category"
      submitLabel="Create"
      onSubmit={onSubmit}
    />
  );
};
