import {
  ALLOWED_IMAGE_TYPES,
  AuthorFormValues,
  MAXIMUM_IMAGE_SIZE,
  sanitySlugifier,
} from '@district-seoul/utils';
import React from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
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
import clsx from 'clsx';

type AuthorFormProps = {
  form: UseFormReturn<AuthorFormValues>;
  submitLabel: string;
  onSubmit: SubmitHandler<AuthorFormValues>;
  imageUploadAction: (formData: FormData) => Promise<string>;
  className?: string;
  formTitle: string;
};

export const AuthorForm = ({
  form,
  submitLabel,
  onSubmit,
  imageUploadAction,
  className,
  formTitle,
}: AuthorFormProps): React.JSX.Element => {
  const generateSlug = () => {
    const name = form.getValues('name');

    const slug = sanitySlugifier(name);

    if (!slug) {
      form.setError('slug', {
        message: 'Invalid slug type! May be add Author name first?',
      });
      return;
    }

    form.setValue('slug', `${slug}-author`, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      form.setError('imageAssetId', {
        message: 'Image upload failed!',
      });
      return;
    }

    if (file.size > MAXIMUM_IMAGE_SIZE(1)) {
      form.setError('imageAssetId', {
        message: 'Image size cannot exceed 1 MB',
      });
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      form.setError('imageAssetId', {
        message: 'Only accept image type',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const assetId = await imageUploadAction(formData);

    if (!assetId) {
      form.setError('imageAssetId', {
        message: 'Image upload failed!',
      });
      return;
    }

    form.setValue('imageAssetId', assetId, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <Bounded
      as="form"
      onSubmit={form.handleSubmit(onSubmit)}
      className={twMerge(clsx('flex flex-col gap-y-6', className))}
    >
      <SectionTitle as="h3" size="sm" separated={false} label1={formTitle} />

      <div className="space-y-2">
        <FormLabel htmlFor="name">Author Name</FormLabel>
        <Input
          type="text"
          id="name"
          {...form.register('name')}
          className={twMerge(clsx(form.formState.errors.name && 'inputError!'))}
        />
        {form.formState.errors.name && (
          <FormErrorMessage>
            {form.formState.errors.name.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="sapce-y-2">
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <LabelInfoText text="Slug is required to generate a page on the website" />
        <div className="flex gap-x-2 items-start">
          <div className="flex flex-col gap-y-1 w-full">
            <Input
              type="text"
              id="slug"
              className={twMerge(
                clsx(form.formState.errors.slug && 'inputError!'),
              )}
              required
              aria-required
              {...form.register('slug')}
            />
            {form.formState.errors.slug && (
              <FormErrorMessage>
                {form.formState.errors.slug.message}
              </FormErrorMessage>
            )}
          </div>
          <Button
            type="button"
            onClick={generateSlug}
            aria-label="generate slug button"
          >
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="bioEn">Author Bio in English</FormLabel>
        <TextareaWithCount
          id="bioEn"
          maxLength={10000}
          {...form.register('bioEn')}
          className={twMerge(
            clsx(form.formState.errors.bioEn && 'inputError!'),
          )}
        />
        {form.formState.errors.bioEn && (
          <FormErrorMessage>
            {form.formState.errors.bioEn.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="bioKo">Author Bio in Korean</FormLabel>
        <TextareaWithCount
          id="bioKo"
          maxLength={10000}
          {...form.register('bioKo')}
          className={twMerge(
            clsx(form.formState.errors.bioKo && 'inputError!'),
          )}
        />
        {form.formState.errors.bioKo && (
          <FormErrorMessage>
            {form.formState.errors.bioKo.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="specializedIn">Specialized In</FormLabel>
        <Input
          type="text"
          id="specializedIn"
          {...form.register('specializedIn')}
          className={form.formState.errors.specializedIn && 'inputError!'}
        />
        {form.formState.errors.specializedIn && (
          <FormErrorMessage>
            {form.formState.errors.specializedIn.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="socialLink">Social Media URL</FormLabel>
        <Input
          type="url"
          id="socialLink"
          {...form.register('socialLink')}
          className={twMerge(
            clsx(form.formState.errors.socialLink && 'inputError!'),
          )}
        />
        {form.formState.errors.socialLink && (
          <FormErrorMessage>
            {form.formState.errors.socialLink.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="imageAsset">Upload Author Image</FormLabel>
        <ImageInput
          id="imageAsset"
          onChange={handleImage}
          className={twMerge(
            clsx(form.formState.errors.imageAssetId && 'inputError!'),
          )}
        />
        {form.formState.errors.imageAssetId && (
          <FormErrorMessage>
            {form.formState.errors.imageAssetId.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="imageAlt">Image Alt Text</FormLabel>
        <LabelInfoText text="Image Alternatie text is required for screen reader" />
        <Input
          type="text"
          id="imageAlt"
          className={twMerge(
            clsx(form.formState.errors.imageAlt && 'inputError!'),
          )}
          {...form.register('imageAlt')}
          required
          aria-required
        />
        {form.formState.errors.imageAlt && (
          <FormErrorMessage>
            {form.formState.errors.imageAlt.message}
          </FormErrorMessage>
        )}
      </div>

      <SubmitButton className="self-start">{submitLabel}</SubmitButton>
    </Bounded>
  );
};
