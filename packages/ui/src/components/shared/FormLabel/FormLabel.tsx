import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FaCircleInfo } from 'react-icons/fa6';

type FormLabelProps = {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
};

export const FormLabel = ({
  htmlFor,
  className,

  children,
}: FormLabelProps): React.JSX.Element => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        clsx(
          'block after:ml-0.5 after:text-brand-error-800 after:content-["*"]',

          className,
        ),
      )}
    >
      {children}
    </label>
  );
};
