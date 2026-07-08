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
import { toast } from 'sonner';
import { StoreForm } from './StoreForm';

type EditStorFormProps = {
  action: (
    data: StoreFormInputValues,
  ) => Promise<ActionResponse<StoreFormOutputValues>>;
  imageUploadAction: (formData: FormData) => Promise<string>;
  store: StoreFormOutputValues;
};

export const EditStoreForm = ({
  action,
  imageUploadAction,
  store,
}: EditStorFormProps): React.JSX.Element => {
  const form = useForm<StoreFormInputValues>({
    resolver: zodResolver(StoreFormSchema),
    defaultValues: {
      nameEn: store.nameEn ?? '',
      nameKo: store.nameKo ?? '',
      slug: store.slug ?? '',
      storeHours: store.storeHours ?? [],
      isOpened: store.isOpened ?? false,
      reasonForClosingEn: store.reasonForClosingEn ?? '',
      reasonForClosingKo: store.reasonForClosingKo ?? '',
      imageAlt: store.imageAlt ?? '',
      imageAssetId: store.imageAssetId ?? '',
      email: store.email ?? '',
      phone: store.phone ?? '',
      street: store.street ?? '',
      city: store.city ?? '',
      zip: store.zip ?? '',
      state: store.state ?? '',
      country: store.country ?? '',
      latitude: store.latitude ?? 0,
      longitude: store.longitude ?? 0,
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
      imageUploadAction={imageUploadAction}
      submitLabel="Edit"
      formTitle="Edit Store Form"
      onSubmit={onSubmit}
    />
  );
};
