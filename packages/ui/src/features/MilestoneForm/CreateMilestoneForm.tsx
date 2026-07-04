'use client';

import {
  ActionResponse,
  MilestoneFormSchema,
  MilestoneFormValues,
} from '@district-seoul/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { MilestoneForm } from './MilestoneForm';

type CreateMilestoneFormProps = {
  action: (
    data: MilestoneFormValues,
  ) => Promise<ActionResponse<MilestoneFormValues>>;
};

export const CreateMilestoneForm = ({
  action,
}: CreateMilestoneFormProps): React.JSX.Element => {
  const form = useForm<MilestoneFormValues>({
    resolver: zodResolver(MilestoneFormSchema),
    defaultValues: {
      nameEn: '',
      nameKo: '',
      bodyEn: '',
      bodyKo: '',
      slug: '',
      year: '',
    },
  });

  const onSubmit: SubmitHandler<MilestoneFormValues> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      return form.setError(result.field as keyof MilestoneFormValues, {
        message: result.message,
      });
    }

    toast.success(result.message);
  };

  return (
    <MilestoneForm
      form={form}
      submitLabel="Create"
      formTitle="Create Milestone"
      onSubmit={onSubmit}
    />
  );
};
