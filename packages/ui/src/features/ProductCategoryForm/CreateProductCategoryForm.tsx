'use client';

import React from 'react';
import { ProductCategoryForm } from './ProductCategoryForm';
import {
  ActionResponse,
  ProductCategoryFormInputValues,
  ProductCategoryFormOutputValues,
  ProductCategoryFormSchema,
} from '@district-seoul/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

type CreateProductCategoryFormProps = {
  action: (
    data: ProductCategoryFormInputValues,
  ) => Promise<ActionResponse<ProductCategoryFormOutputValues>>;
  imageUploadAction: (formData: FormData) => Promise<string>;
};

export const CreateProductCategoryForm = ({
  action,
  imageUploadAction,
}: CreateProductCategoryFormProps): React.JSX.Element => {
  const form = useForm<ProductCategoryFormInputValues>({
    resolver: zodResolver(ProductCategoryFormSchema),
    defaultValues: {
      nameEn: '',
      nameKo: '',
      slug: '',
      imageAlt: '',
      imageAssetId: '',
    },
  });

  const onSubmit = async (data: ProductCategoryFormInputValues) => {
    const result = await action(data);

    if (!result.success) {
      return form.setError(
        result.field as keyof ProductCategoryFormInputValues,
        {
          message: result.message,
        },
      );
    }

    toast.success(result.message);
  };

  return (
    <ProductCategoryForm
      form={form}
      onSubmit={onSubmit}
      submitLabel="Create"
      formTitle="Create Product Category"
      imageUploadAction={imageUploadAction}
    />
  );
};
