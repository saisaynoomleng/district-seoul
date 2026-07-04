'use client';

import React from 'react';
import {
  Bounded,
  Button,
  FormErrorMessage,
  FormLabel,
  ImageInput,
  Input,
  LabelInfoText,
  SectionTitle,
  SubmitButton,
  TextareaWithCount,
} from '../../components';
import {
  ActionResponse,
  ALLOWED_IMAGE_TYPES,
  AuthorFormSchema,
  AuthorFormValues,
  MAXIMUM_IMAGE_SIZE,
  sanitySlugifier,
} from '@district-seoul/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { AuthorForm } from '.';

type EditAuthorFormProps = {
  author: AuthorFormValues;
  className?: string;
  action: (data: AuthorFormValues) => Promise<ActionResponse<AuthorFormValues>>;
  imageUploadAction: (formData: FormData) => Promise<string>;
};

export const EditAuthorForm = ({
  author,
  className,
  action,
  imageUploadAction,
}: EditAuthorFormProps): React.JSX.Element => {
  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(AuthorFormSchema),
    defaultValues: {
      name: author.name ?? '',
      slug: author.slug ?? '',
      bioEn: author.bioEn ?? '',
      bioKo: author.bioKo ?? '',
      imageAlt: author.imageAlt ?? '',
      imageAssetId: author.imageAssetId ?? '',
      socialLink: author.socialLink ?? '',
      specializedIn: author.specializedIn ?? '',
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
      className={className ?? ''}
      form={form}
      formTitle="Edit Author"
      submitLabel="Edit"
      onSubmit={onSubmit}
      imageUploadAction={imageUploadAction}
    />
  );
};
