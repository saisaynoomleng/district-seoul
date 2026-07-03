'use client';

import { Button } from '#components/ui/button';
import clsx from 'clsx';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { LoadingSpinner } from '../LoadingSpinner';
import { IoIosPaperPlane } from 'react-icons/io';

type SubmitButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export const SubmitButton = ({
  className,
  children,
}: SubmitButtonProps): React.JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="submit"
      disabled={pending}
      className={twMerge(clsx('', className))}
    >
      {pending ? (
        <LoadingSpinner className="relative z-10" />
      ) : (
        <span className="flex gap-x-2 items-center relative z-10">
          {children}{' '}
          <IoIosPaperPlane className="group-hover:rotate-45 duration-300 ease-in-out transition-transform" />
        </span>
      )}
    </Button>
  );
};
