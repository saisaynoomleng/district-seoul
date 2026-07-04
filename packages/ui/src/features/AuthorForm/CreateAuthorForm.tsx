import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import {
  ActionResponse,
  AuthorFormSchema,
  AuthorFormValues,
  sanitySlugifier,
} from '@district-seoul/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthorForm } from '.';

type CreateAuthorFormProps = {
  className?: string;
  action: (data: AuthorFormValues) => Promise<ActionResponse<AuthorFormValues>>;
  imageUploadAction: (formData: FormData) => Promise<string>;
};

export const CreateAuthorForm = ({
  className,
  action,
  imageUploadAction,
}: CreateAuthorFormProps): React.JSX.Element => {
  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(AuthorFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      bioEn: '',
      bioKo: '',
      imageAssetId: '',
      imageAlt: '',
      socialLink: '',
      specializedIn: '',
    },
  });

  const onSubmit: SubmitHandler<AuthorFormValues> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      form.setError(result.field as keyof AuthorFormValues, {
        message: result.message,
      });
      return;
    }

    toast.success(result.message);
  };

  return (
    <AuthorForm
      form={form}
      submitLabel="Create"
      onSubmit={onSubmit}
      imageUploadAction={imageUploadAction}
      className={className ?? ''}
      formTitle="Create Author"
    />
  );
};
