'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  NewsletterFormSchema,
  NewsletterFormSchemaValues,
  ActionResponse,
} from '@district-seoul/utils';
import { Input } from '#components/ui/input';
import {
  Bounded,
  FormErrorMessage,
  FormLabel,
  SubmitButton,
} from '../../components/shared';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { toast } from 'sonner';

type NewsletterFormProps = {
  className?: string;
  action: (
    data: NewsletterFormSchemaValues,
  ) => Promise<ActionResponse<NewsletterFormSchemaValues>>;
};

export const NewsletterForm = ({
  className,
  action,
}: NewsletterFormProps): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NewsletterFormSchemaValues>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<NewsletterFormSchemaValues> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      setError(result.field as keyof NewsletterFormSchemaValues, {
        message: result.message,
      });
    }

    toast.success(result.message);
  };

  return (
    <Bounded
      as="form"
      size="full"
      className={twMerge(clsx('space-y-2', className))}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormLabel htmlFor="email">Email</FormLabel>
      <div className="flex gap-x-2">
        <div className="space-y-2 w-full">
          <Input
            type="email"
            id="email"
            autoComplete="email"
            aria-describedby="email-help"
            {...register('email')}
            className={twMerge(clsx(errors.email && 'inputError'))}
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </div>
        <SubmitButton>Subscribe</SubmitButton>
      </div>
    </Bounded>
  );
};
