'use client';

import React, { ComponentPropsWithoutRef, useState } from 'react';
import { Bounded } from '../Bounded';
import { Textarea } from '#components/ui/textarea';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type TextareaWithCountProps = {
  className?: string;
  maxLength?: number;
  id: string;
} & Omit<ComponentPropsWithoutRef<'textarea'>, 'className' | 'maxLength'>;

export const TextareaWithCount = ({
  className,
  maxLength = 2000,
  id,
  onChange,
  ...props
}: TextareaWithCountProps): React.JSX.Element => {
  const [count, setCount] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.target.value.length);
    onChange?.(e);
  };

  return (
    <Bounded
      as="div"
      padding="none"
      size="full"
      isCentered={false}
      className="space-y-2"
    >
      <Textarea
        maxLength={maxLength}
        id={id}
        {...props}
        onChange={handleChange}
        className={twMerge(clsx('h-30', className))}
      />

      <p
        className={clsx(
          'text-right',
          count === maxLength && 'text-brand-error-700',
        )}
      >
        {count} / {maxLength}
      </p>
    </Bounded>
  );
};
