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
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import {
  ActionResponse,
  CreateAuthorFormSchema,
  CreateAuthorFormValues,
  sanitySlugifier,
} from '@district-seoul/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

type CreateAuthorFormProps = {
  className?: string;
  action: (
    data: CreateAuthorFormValues,
  ) => Promise<ActionResponse<CreateAuthorFormValues>>;
  imageUploadAction: (formData: FormData) => Promise<string>;
};

export const CreateAuthorForm = ({
  className,
  action,
  imageUploadAction,
}: CreateAuthorFormProps): React.JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    getValues,
  } = useForm<CreateAuthorFormValues>({
    resolver: zodResolver(CreateAuthorFormSchema),
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

  const generateSlug = () => {
    const name = getValues('name');

    const slug = sanitySlugifier(name);

    if (!slug) {
      setError('slug', {
        message: 'Invalid slug type! May be add Author name first?',
      });
      return;
    }

    setValue('slug', `${slug}-author`, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const ALLOWED_TYPES = [
      'image/webp',
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/avif',
    ];
    const MAXIMUM_SIZE = 1 * 1024 * 1024;

    if (!file) {
      setError('imageAssetId', {
        message: 'Image upload failed!',
      });
      return;
    }

    if (file.size > MAXIMUM_SIZE) {
      setError('imageAssetId', {
        message: 'Image size cannot exceed 1 MB',
      });
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('imageAssetId', {
        message: 'Only accept image type',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const assetId = await imageUploadAction(formData);

    if (!assetId) {
      setError('imageAssetId', {
        message: 'Image upload failed!',
      });
      return;
    }

    setValue('imageAssetId', assetId, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<CreateAuthorFormValues> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      setError(result.field as keyof CreateAuthorFormValues, {
        message: result.message,
      });
      return;
    }

    toast.success(result.message);
  };

  return (
    <Bounded
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className={twMerge(clsx('flex flex-col gap-y-6', className))}
    >
      <SectionTitle
        as="h3"
        size="sm"
        separated={false}
        label1="Create Author"
      />

      <div className="space-y-2">
        <FormLabel htmlFor="name">Author Name</FormLabel>
        <Input
          type="text"
          id="name"
          aria-describedby="name-error"
          {...register('name')}
          className={twMerge(clsx(errors.name && 'inputError'))}
        />
        {errors.name && (
          <FormErrorMessage id="name-error">
            {errors.name.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="sapce-y-2">
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <LabelInfoText
          id="slug-helper"
          text="Slug is required to generate a page on the website"
        />
        <div className="flex gap-x-2 items-start">
          <div className="flex flex-col gap-y-1 w-full">
            <Input
              type="text"
              id="slug"
              aria-describedby="slug-helper slug-error"
              className={twMerge(clsx(errors.slug && 'inputError'))}
              required
              aria-required
              {...register('slug')}
            />
            {errors.slug && (
              <FormErrorMessage id="slug-error">
                {errors.slug.message}
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
          aria-describedby="bioEn-error"
          {...register('bioEn')}
          className={twMerge(clsx(errors.bioEn && 'inputError'))}
        />
        {errors.bioEn && (
          <FormErrorMessage id="bioEn-error">
            {errors.bioEn.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="bioKo">Author Bio in Korean</FormLabel>
        <TextareaWithCount
          id="bioKo"
          maxLength={10000}
          aria-describedby="bioKo-error"
          {...register('bioKo')}
          className={twMerge(clsx(errors.bioKo && 'inputError'))}
        />
        {errors.bioKo && (
          <FormErrorMessage id="bioKo-error">
            {errors.bioKo.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="specializedIn">Specialized In</FormLabel>
        <Input
          type="text"
          id="specializedIn"
          aria-describedby="specialized-error"
          {...register('specializedIn')}
          className={errors.specializedIn && 'inputError'}
        />
        {errors.specializedIn && (
          <FormErrorMessage id="specialized-error">
            {errors.specializedIn.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="socialLink">Social Media URL</FormLabel>
        <Input
          type="url"
          id="socialLink"
          aria-describedby="social-error"
          {...register('socialLink')}
          className={twMerge(clsx(errors.socialLink && 'inputError'))}
        />
        {errors.socialLink && (
          <FormErrorMessage id="social-error">
            {errors.socialLink.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="imageAsset">Upload Author Image</FormLabel>
        <ImageInput
          id="imageAsset"
          onChange={handleImage}
          aria-describedby="assetId-error"
          className={twMerge(clsx(errors.imageAssetId && 'inputError'))}
        />
        {errors.imageAssetId && (
          <FormErrorMessage id="assetId-error">
            {errors.imageAssetId.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <FormLabel htmlFor="imageAlt">Image Alt Text</FormLabel>
        <LabelInfoText
          id="image-alt-helper"
          text="Image Alternatie text is required for screen reader"
        />
        <Input
          type="text"
          id="imageAlt"
          className={twMerge(clsx(errors.imageAlt && 'inputError'))}
          {...register('imageAlt')}
          required
          aria-required
          aria-describedby="image-alt-helper image-alt-error"
        />
        {errors.imageAlt && (
          <FormErrorMessage id="image-alt-error">
            {errors.imageAlt.message}
          </FormErrorMessage>
        )}
      </div>

      <SubmitButton className="self-start">Create</SubmitButton>
    </Bounded>
  );
};
