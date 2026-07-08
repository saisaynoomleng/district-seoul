'use client';

import {
  ActionResponse,
  ProductCategoryFormInputValues,
  ProductCategoryFormOutputValues,
  ProductCategoryFormSchema,
} from '@district-seoul/utils';
import React from 'react';
import { ProductCategoryForm } from './ProductCategoryForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

type EditProductCategoryFormProps = {
  category: ProductCategoryFormInputValues;
  action: (
    data: ProductCategoryFormInputValues,
  ) => Promise<ActionResponse<ProductCategoryFormOutputValues>>;
  imageUploadAction: (formData: FormData) => Promise<string>;
};

export const EditProductCategoryForm = ({
  action,
  imageUploadAction,
  category,
}: EditProductCategoryFormProps): React.JSX.Element => {
  const form = useForm<ProductCategoryFormInputValues>({
    resolver: zodResolver(ProductCategoryFormSchema),
    defaultValues: {
      nameEn: category.nameEn ?? '',
      nameKo: category.nameKo ?? '',
      slug: category.slug ?? '',
      imageAlt: category.imageAlt ?? '',
      imageAssetId: category.imageAssetId ?? '',
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
      formTitle="Edit Product Category"
      submitLabel="Edit"
      onSubmit={onSubmit}
      imageUploadAction={imageUploadAction}
    />
  );
};
