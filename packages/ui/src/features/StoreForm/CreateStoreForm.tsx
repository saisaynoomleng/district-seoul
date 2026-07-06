'use client';

import {
  ActionResponse,
  StoreFormInputValues,
  StoreFormOutputValues,
  StoreFormSchema,
} from '@district-seoul/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StoreForm } from './StoreForm';
import { toast } from 'sonner';

type CreateStoreFormProps = {
  action: (
    data: StoreFormInputValues,
  ) => Promise<ActionResponse<StoreFormOutputValues>>;
  imageUploadAction: (formData: FormData) => Promise<string>;
};

export const CreateStoreForm = ({
  action,
  imageUploadAction,
}: CreateStoreFormProps): React.JSX.Element => {
  const form = useForm<StoreFormInputValues>({
    resolver: zodResolver(StoreFormSchema),
    defaultValues: {
      nameEn: '',
      nameKo: '',
      slug: '',
      storeHours: Array.from({ length: 7 }, (_, day) => ({
        day,
        openingHours: '',
        closingHours: '',
      })),
      isOpened: false,
      reasonForClosingEn: '',
      reasonForClosingKo: '',
      imageAssetId: '',
      imageAlt: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const onSubmit = async (data: StoreFormInputValues) => {
    const result = await action(data);

    if (!result.success) {
      return form.setError(result.field as keyof StoreFormInputValues, {
        message: result.message,
      });
    }

    toast.success(result.message);
  };

  return (
    <StoreForm
      form={form}
      onSubmit={onSubmit}
      submitLabel="Create"
      formTitle="Create a Store"
      imageUploadAction={imageUploadAction}
    />
  );
};
