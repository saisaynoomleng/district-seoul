import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type FormErrorMessageProps = {
  className?: string;
  children: React.ReactNode;
  id: string;
};

export const FormErrorMessage = ({
  id,
  className,
  children,
}: FormErrorMessageProps): React.JSX.Element => {
  return (
    <p
      className={twMerge(
        clsx('text-fs-300 text-brand-error-800 italic', className),
      )}
      role="alert"
      id={id}
    >
      {children}
    </p>
  );
};
