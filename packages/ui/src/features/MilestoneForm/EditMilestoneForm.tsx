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

type EditMilestoneForm = {
  action: (
    data: MilestoneFormValues,
  ) => Promise<ActionResponse<MilestoneFormValues>>;
  milestone: MilestoneFormValues;
};

export const EditMilestoneForm = ({
  action,
  milestone,
}: EditMilestoneForm): React.JSX.Element => {
  const form = useForm<MilestoneFormValues>({
    resolver: zodResolver(MilestoneFormSchema),
    defaultValues: {
      nameEn: milestone.nameEn ?? '',
      nameKo: milestone.nameKo ?? '',
      slug: milestone.slug ?? '',
      bodyEn: milestone.bodyEn ?? '',
      bodyKo: milestone.bodyKo ?? '',
      year: milestone.year ?? 0,
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
      onSubmit={onSubmit}
      submitLabel="Edit"
      formTitle="Edit Milestone"
    />
  );
};
