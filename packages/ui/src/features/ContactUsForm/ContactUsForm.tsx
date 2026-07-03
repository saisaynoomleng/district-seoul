'use client';

import {
  ActionResponse,
  ContactUsFormSchema,
  ContactUsFormSchemaValues,
} from '@district-seoul/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import {
  Bounded,
  FormErrorMessage,
  FormLabel,
  Input,
  SectionTitle,
  SubmitButton,
  TextareaWithCount,
} from '../../components';

type ContactUsFormProps = {
  className?: string;
  action: (
    data: ContactUsFormSchemaValues,
  ) => Promise<ActionResponse<ContactUsFormSchemaValues>>;
};

export const ContactUsForm = ({
  className,
  action,
}: ContactUsFormProps): React.JSX.Element => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactUsFormSchemaValues>({
    resolver: zodResolver(ContactUsFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactUsFormSchemaValues> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      setError(result.field as keyof ContactUsFormSchemaValues, {
        message: result.message,
      });
    }

    toast.success(result.message);
  };

  return (
    <Bounded
      as="form"
      size="full"
      className={twMerge(
        clsx('grid md:grid-cols-2 md:gap-x-6 gap-y-4', className),
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SectionTitle
        as="h3"
        label1="Send your message here"
        className="col-span-full text-center"
        separated={false}
      />

      <div className="space-y-2">
        <FormLabel htmlFor="fullname">Full Name</FormLabel>
        <Input
          type="text"
          id="fullname"
          autoComplete="name"
          placeholder="John Doe"
          className={twMerge(clsx(errors.fullName && 'inputError'))}
          {...register('fullName')}
        />
        {errors.fullName && (
          <FormErrorMessage>{errors.fullName.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="johndoe@mail.com"
          className={twMerge(clsx(errors.email && 'inputError'))}
          {...register('email')}
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2 col-span-full">
        <FormLabel htmlFor="phone">Phone</FormLabel>
        <Input
          type="string"
          id="phone"
          autoComplete="mobile"
          placeholder="+1 234 567 8901"
          className={twMerge(clsx(errors.phone && 'inputError'))}
          {...register('phone')}
        />
        {errors.phone && (
          <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2 col-span-full">
        <FormLabel htmlFor="subject">Subject</FormLabel>
        <Input
          type="text"
          id="subject"
          {...register('subject')}
          className={twMerge(clsx(errors.subject && 'inputError'))}
        />
        {errors.subject && (
          <FormErrorMessage>{errors.subject.message}</FormErrorMessage>
        )}
      </div>

      <div className="space-y-2 col-span-full">
        <FormLabel htmlFor="message">Message</FormLabel>
        <TextareaWithCount
          id="message"
          maxLength={3000}
          {...register('message')}
          className={twMerge(clsx(errors.message && 'inputError'))}
        />
        {errors.message && (
          <FormErrorMessage>{errors.message.message}</FormErrorMessage>
        )}
      </div>

      <SubmitButton className="w-fit">Send</SubmitButton>
    </Bounded>
  );
};
