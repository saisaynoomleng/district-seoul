import { BlogCategoryFormValues, sanitySlugifier } from '@district-seoul/utils';
import clsx from 'clsx';
import React from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import {
  Bounded,
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
  LabelInfoText,
  SectionTitle,
  SubmitButton,
} from '../../components';

type BlogCategoryFormProps = {
  form: UseFormReturn<BlogCategoryFormValues>;
  submitLabel: string;
  formTitle: string;
  className?: string;
  onSubmit: SubmitHandler<BlogCategoryFormValues>;
};

export const BlogCategoryForm = ({
  form,
  submitLabel,
  formTitle,
  className,
  onSubmit,
}: BlogCategoryFormProps): React.JSX.Element => {
  const { errors } = form.formState;

  const generateSlug = () => {
    const name = form.getValues('nameEn');

    if (!name) {
      return form.setError('slug', {
        message: 'Input name in english first!',
      });
    }

    const slug = sanitySlugifier(name);

    if (!slug) {
      return form.setError('slug', {
        message: 'Invalid Slug!',
      });
    }

    form.setValue('slug', slug, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <Bounded
      as="form"
      size="full"
      className={twMerge(clsx('flex flex-col gap-y-6', className))}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <SectionTitle as="h3" label1={formTitle} size="sm" />

      <div className="space-y-1">
        <FormLabel htmlFor="nameEn">Category Name in English</FormLabel>
        <Input
          type="text"
          id="nameEn"
          {...form.register('nameEn')}
          className={clsx(errors.nameEn && 'inputError!')}
        />
        {errors.nameEn && (
          <FormErrorMessage>{errors.nameEn.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="nameKo">Category Name in Korean</FormLabel>
        <Input
          type="text"
          id="nameKo"
          className={clsx(errors.nameKo && 'inputError!')}
          {...form.register('nameKo')}
        />
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <LabelInfoText text="Slug is required to generate a page on a website" />
        <div className="flex gap-x-2 items-center">
          <Input
            type="text"
            id="slug"
            {...form.register('slug')}
            className={clsx(errors.slug && 'inputError!')}
          />
          <Button type="button" onClick={generateSlug}>
            Generate
          </Button>
        </div>
        {errors.slug && (
          <FormErrorMessage>{errors.slug.message}</FormErrorMessage>
        )}
      </div>

      <SubmitButton className="self-start">{submitLabel}</SubmitButton>
    </Bounded>
  );
};
