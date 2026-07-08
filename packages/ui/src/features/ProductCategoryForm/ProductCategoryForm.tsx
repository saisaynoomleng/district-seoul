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
} from '../../components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import {
  ALLOWED_IMAGE_TYPES,
  MAXIMUM_IMAGE_SIZE,
  ProductCategoryFormInputValues,
  sanitySlugifier,
} from '@district-seoul/utils';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type ProductCategoryFormProps = {
  form: UseFormReturn<ProductCategoryFormInputValues>;
  submitLabel: string;
  formTitle: string;
  onSubmit: SubmitHandler<ProductCategoryFormInputValues>;
  imageUploadAction: (formData: FormData) => Promise<string>;
  className?: string;
};

export const ProductCategoryForm = ({
  form,
  submitLabel,
  formTitle,
  onSubmit,
  imageUploadAction,
  className,
}: ProductCategoryFormProps): React.JSX.Element => {
  const { errors } = form.formState;
  const { register } = form;

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
        message: 'Invalid slug!',
      });
    }

    form.setValue('slug', slug, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return form.setError('imageAssetId', {
        message: 'Upload image first',
      });
    }

    if (file.size > MAXIMUM_IMAGE_SIZE(1)) {
      return form.setError('imageAssetId', {
        message: 'Image size cannot exceeds 1 MB',
      });
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return form.setError('imageAssetId', {
        message: 'Only accept image type',
      });
    }

    const formData = new FormData();
    formData.append('file', file);

    const assetId = await imageUploadAction(formData);

    if (!assetId) {
      return form.setError('imageAssetId', {
        message: 'Image upload failed!',
      });
    }

    form.setValue('imageAssetId', assetId, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <Bounded
      as="form"
      className={twMerge(clsx('flex flex-col gap-y-6', className))}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <SectionTitle as="h3" size="sm" label1={formTitle} />

      <div className="space-y-2">
        <FormLabel htmlFor="nameEn">Category Name in English</FormLabel>
        <Input
          type="text"
          id="nameEn"
          className={clsx(errors.nameEn && 'inputError!')}
          {...register('nameEn')}
        />
        {errors.nameEn && (
          <FormErrorMessage>{errors.nameEn.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="nameKo">Category Name in Korean</FormLabel>
        <Input
          type="text"
          id="nameKo"
          className={clsx(errors.nameKo && 'inputError!')}
          {...register('nameKo')}
        />
        {errors.nameKo && (
          <FormErrorMessage>{errors.nameKo.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <LabelInfoText />
        <div className="flex gap-x-2 min-w-full">
          <Input
            type="text"
            id="slug"
            className={errors.slug && 'inputError!'}
            {...register('slug')}
          />
          <Button type="button" onClick={generateSlug}>
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="imageAssetId">Upload An Image</FormLabel>
        <ImageInput
          id="imageAssetId"
          onChange={handleImageUpload}
          className={clsx(errors.imageAssetId && 'inputError!')}
        />
        {errors.imageAssetId && (
          <FormErrorMessage>{errors.imageAssetId.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="imageAlt">Image Alternative Text</FormLabel>
        <Input
          type="text"
          id="imageAlt"
          className={clsx(errors.imageAlt && 'inputError!')}
          {...register('imageAlt')}
        />
        {errors.imageAlt && (
          <FormErrorMessage>{errors.imageAlt.message}</FormErrorMessage>
        )}
      </div>

      <SubmitButton className="self-start">{submitLabel}</SubmitButton>
    </Bounded>
  );
};
