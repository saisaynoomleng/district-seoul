'use client';

import {
  ALLOWED_IMAGE_TYPES,
  MAXIMUM_IMAGE_SIZE,
  sanitySlugifier,
  StoreFormInputValues,
} from '@district-seoul/utils';
import React from 'react';
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form';
import {
  Bounded,
  Button,
  Checkbox,
  FormErrorMessage,
  FormLabel,
  ImageInput,
  Input,
  LabelInfoText,
  SectionTitle,
  Separator,
  SubmitButton,
  TextareaWithCount,
} from '../../components';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type StoreFormProps = {
  form: UseFormReturn<StoreFormInputValues>;
  onSubmit: SubmitHandler<StoreFormInputValues>;
  imageUploadAction: (formData: FormData) => Promise<string>;
  submitLabel: string;
  formTitle: string;
  className?: string;
};

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const StoreForm = ({
  form,
  onSubmit,
  imageUploadAction,
  submitLabel,
  formTitle,
  className,
}: StoreFormProps): React.JSX.Element => {
  const { errors } = form.formState;
  const { register } = form;

  const generateSlug = () => {
    const name = form.getValues('nameEn');

    if (!name) {
      return form.setError('slug', {
        message: 'Input Name in English first!',
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
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return form.setError('imageAssetId', {
        message: 'Please upload an image',
      });
    }

    if (file.size > MAXIMUM_IMAGE_SIZE(1)) {
      return form.setError('imageAssetId', {
        message: 'Image size cannot exceeds 1MB',
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
      size="full"
      className={twMerge(clsx('flex flex-col gap-y-4', className))}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <SectionTitle as="h3" size="sm" label1={formTitle} />

      <p className="font-semibold text-fs-500 text-center">
        Basic Store Information
      </p>
      <div className="space-y-1">
        <FormLabel htmlFor="nameEn">Store name in English</FormLabel>
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

      <div className="space-y-1">
        <FormLabel htmlFor="nameKo">Store name in Korean</FormLabel>
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

      <div className="space-y-1">
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <LabelInfoText />
        <div className="flex items-center gap-x-2">
          <Input
            type="text"
            id="slug"
            className={clsx(errors.slug && 'inputError!')}
            {...register('slug')}
          />
          <Button type="button" onClick={generateSlug}>
            Generate
          </Button>
        </div>
        {errors.slug && (
          <FormErrorMessage>{errors.slug.message}</FormErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-y-2">
        <p>Store Hours</p>
        {DAYS.map((day, index) => (
          <div
            key={day}
            className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center"
          >
            <FormLabel htmlFor={day}>{day}</FormLabel>

            <input
              type="hidden"
              {...register(`storeHours.${index}.day`, {
                valueAsNumber: true,
              })}
            />

            <FormLabel
              htmlFor={`storeHours.${index}.openingHours`}
              className="sr-only"
            >
              Store {index} Opening Hours
            </FormLabel>
            <Input
              id={`storeHours.${index}.openingHours`}
              type="time"
              data-testid={`storeHours.${index}.openingHours`}
              {...register(`storeHours.${index}.openingHours`)}
            />

            <FormLabel
              htmlFor={`storeHours.${index}.closingHours`}
              className="sr-only"
            >
              Store {index} Closing Hours
            </FormLabel>
            <Input
              id={`storeHours.${index}.closingHours`}
              data-testid={`storeHours.${index}.closingHours`}
              type="time"
              {...register(`storeHours.${index}.closingHours`)}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="isOpened" className="flex items-center gap-x-2">
          <Controller
            name="isOpened"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                id="isOpened"
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          Is the Store Open?
        </FormLabel>
        {errors.isOpened && (
          <FormErrorMessage>{errors.isOpened.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="reasonForClosingEn">
          Reason For Closing in English
        </FormLabel>
        <TextareaWithCount
          maxLength={2000}
          id="reasonForClosingEn"
          {...register('reasonForClosingEn')}
          className={clsx(errors.reasonForClosingEn && 'inputError!')}
        />
        {errors.reasonForClosingEn && (
          <FormErrorMessage>
            {errors.reasonForClosingEn.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="reasonForClosingKo">
          Reason For Closing in Korean
        </FormLabel>
        <TextareaWithCount
          maxLength={2000}
          id="reasonForClosingKo"
          {...register('reasonForClosingKo')}
          className={clsx(errors.reasonForClosingKo && 'inputError!')}
        />
        {errors.reasonForClosingKo && (
          <FormErrorMessage>
            {errors.reasonForClosingKo.message}
          </FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="imageAssetId">Upload an image</FormLabel>
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
        <LabelInfoText text="Image alternative text is required for screen reader" />
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

      <Separator />

      <p className="font-semibold text-fs-500 text-center">Contact Info</p>

      <div className="space-y-2">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          className={errors.email && 'inputError!'}
          {...register('email')}
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="phone">Phone</FormLabel>
        <Input
          type="text"
          id="phone"
          className={errors.phone && 'inputError!'}
          {...register('phone')}
        />
        {errors.phone && (
          <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="street">Street Address</FormLabel>
        <Input
          type="text"
          id="street"
          className={errors.street && 'inputError!'}
          {...register('street')}
        />
        {errors.street && (
          <FormErrorMessage>{errors.street.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="city">City Address</FormLabel>
        <Input
          type="text"
          id="city"
          className={errors.city && 'inputError!'}
          {...register('city')}
        />
        {errors.city && (
          <FormErrorMessage>{errors.city.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="zip">Zip/Postal Code</FormLabel>
        <Input
          type="text"
          id="zip"
          className={errors.zip && 'inputError!'}
          {...register('zip')}
        />
        {errors.zip && (
          <FormErrorMessage>{errors.zip.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="state">State Address</FormLabel>
        <Input
          type="text"
          id="state"
          className={errors.state && 'inputError!'}
          {...register('state')}
        />
        {errors.state && (
          <FormErrorMessage>{errors.state.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="country">Country</FormLabel>
        <Input
          type="text"
          id="country"
          className={errors.country && 'inputError!'}
          {...register('country')}
        />
        {errors.country && (
          <FormErrorMessage>{errors.country.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="latitude">Latitude</FormLabel>
        <Input
          type="number"
          id="latitude"
          className={errors.latitude && 'inputError'}
          {...register('latitude')}
        />
        {errors.latitude && (
          <FormErrorMessage>{errors.latitude.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="longitude">Longitude</FormLabel>
        <Input
          type="number"
          id="longitude"
          className={errors.longitude && 'inputError!'}
          {...register('longitude')}
        />
        {errors.longitude && (
          <FormErrorMessage>{errors.longitude.message}</FormErrorMessage>
        )}
      </div>

      <SubmitButton className="self-start">{submitLabel}</SubmitButton>
    </Bounded>
  );
};
