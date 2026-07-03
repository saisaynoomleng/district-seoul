import React, { ComponentPropsWithoutRef } from 'react';
import { Bounded } from '../Bounded';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Input } from '#components/ui/input';
import { RiImageUploadFill } from 'react-icons/ri';

type ImageInputProps = {
  className?: string;
  id: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'id'>;

export const ImageInput = ({
  className,
  id,
  ...props
}: ImageInputProps): React.JSX.Element => {
  return (
    <Bounded
      as="div"
      padding="sm"
      size="full"
      className={twMerge(clsx('border flex flex-col gap-y-2', className))}
    >
      <div className="self-center">
        <RiImageUploadFill className="size-15 text-brand-black-400 dark:text-brand-black-600" />
      </div>
      <Input
        id={id}
        type="file"
        accept="image/*"
        data-testid="image-input"
        {...props}
      />
    </Bounded>
  );
};
