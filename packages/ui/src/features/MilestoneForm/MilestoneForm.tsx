'use client';

import React from 'react';
import {
  Bounded,
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
  LabelInfoText,
  SectionTitle,
  SubmitButton,
  TextareaWithCount,
} from '../../components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { MilestoneFormValues, sanitySlugifier } from '@district-seoul/utils';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type MilestoneFormProps = {
  form: UseFormReturn<MilestoneFormValues>;
  className?: string;
  onSubmit: SubmitHandler<MilestoneFormValues>;
  submitLabel: string;
  formTitle: string;
};

export const MilestoneForm = ({
  form,
  className,
  onSubmit,
  submitLabel,
  formTitle,
}: MilestoneFormProps): React.JSX.Element => {
  const generateSlug = () => {
    const name = form.getValues('nameEn');

    if (!name) {
      form.setError('slug', {
        message: 'Invalid slug! Add Slogan in English First?',
      });
      return;
    }

    const slug = sanitySlugifier(name);

    if (!slug) {
      form.setError('slug', {
        message: 'Slug generate failed! Try again!',
      });
      return;
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
      onSubmit={form.handleSubmit(onSubmit)}
      className={twMerge(clsx('flex flex-col gap-y-6', className))}
    >
      <SectionTitle as="h3" label1={formTitle} size="sm" />

      <div className="space-y-2">
        <FormLabel htmlFor="nameEn">Slogan in English</FormLabel>
        <Input
          type="text"
          id="nameEn"
          className={form.formState.errors.nameEn && 'inputError'}
          {...form.register('nameEn')}
        />
        {form.formState.errors.nameEn && (
          <FormErrorMessage>
            {form.formState.errors.nameEn.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="nameKo">Slogan in Korean</FormLabel>
        <Input
          type="text"
          id="nameKo"
          className={form.formState.errors.nameKo && 'inputError'}
          {...form.register('nameKo')}
        />
        {form.formState.errors.nameKo && (
          <FormErrorMessage>
            {form.formState.errors.nameKo.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <LabelInfoText text="Slug is required to generate a page on the website" />
        <div className="flex gap-x-2 w-full">
          <Input
            type="text"
            id="slug"
            className={clsx(form.formState.errors.slug && 'inputError')}
            {...form.register('slug')}
          />
          <Button type="button" onClick={generateSlug}>
            Generate
          </Button>
        </div>
        {form.formState.errors.slug && (
          <FormErrorMessage>
            {form.formState.errors.slug.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="year">Year</FormLabel>
        <Input
          type="number"
          id="year"
          className={clsx(form.formState.errors.year && 'inputError')}
          {...form.register('year')}
        />
        {form.formState.errors.year && (
          <FormErrorMessage>
            {form.formState.errors.year.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="bodyEn">Description in English</FormLabel>
        <TextareaWithCount
          id="bodyEn"
          maxLength={10000}
          className={clsx(form.formState.errors.bodyEn && 'inputError')}
          {...form.register('bodyEn')}
        />
        {form.formState.errors.bodyEn && (
          <FormErrorMessage>
            {form.formState.errors.bodyEn.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="bodyKo">Description in Korean</FormLabel>
        <TextareaWithCount
          id="bodyKo"
          maxLength={10000}
          className={clsx(form.formState.errors.bodyKo && 'inputError')}
          {...form.register('bodyKo')}
        />
        {form.formState.errors.bodyKo && (
          <FormErrorMessage>
            {form.formState.errors.bodyKo.message}
          </FormErrorMessage>
        )}
      </div>

      <SubmitButton className="self-start">{submitLabel}</SubmitButton>
    </Bounded>
  );
};
