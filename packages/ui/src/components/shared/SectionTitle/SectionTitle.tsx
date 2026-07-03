import clsx from 'clsx';
import React, { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Headings = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Sizes = 'sm' | 'md' | 'lg';

type SectionTitleProps<T extends Headings> = {
  as?: T;
  className?: string;
  size?: Sizes;
  separated?: boolean;
  label1: string;
  label2?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

const sizeVariants: Record<Sizes, string> = {
  sm: 'text-fs-500 md:text-fs-600 lg:text-fs-700',
  md: 'text-fs-600 md:text-fs-700 lg:text-fs-800',
  lg: 'text-fs-700 md:text-fs-800 lg:text-fs-900',
};

export const SectionTitle = <T extends Headings>({
  as,
  className,
  size = 'md',
  label1,
  separated = false,
  label2,
  ...props
}: SectionTitleProps<T>): React.JSX.Element => {
  const Comp = as ?? 'h2';

  return (
    <Comp
      className={twMerge(clsx(' font-heading', sizeVariants[size], className))}
      {...props}
    >
      {separated ? (
        <>
          <span className="font-normal uppercase">{label1}</span>
          <span className="block font-bold uppercase">{label2}</span>
        </>
      ) : (
        <>
          <span className="uppercase">{label1}</span>
        </>
      )}
    </Comp>
  );
};
