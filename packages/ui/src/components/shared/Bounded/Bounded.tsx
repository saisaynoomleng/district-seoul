import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

type BoundedProps<T extends ElementType> = {
  as?: T;
  padding?: Padding;
  size?: Size;
  isCentered?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'className' | 'as'>;

type Padding = 'none' | 'sm' | 'md' | 'lg';
type Size = 'sm' | 'md' | 'full';

const paddingVariants: Record<Padding, string> = {
  none: '',
  sm: 'px-4 md:px-6 lg:px-8 py-2',
  md: 'px-6 md:px-8 lg:px-10 py-4',
  lg: 'px-8 md:px-10 lg:px-12 py-6',
};

const sizeVariants: Record<Size, string> = {
  sm: 'max-w-4xl',
  md: 'max-w-7xl',
  full: 'max-w-none',
};

export const Bounded = <T extends ElementType>({
  as,
  padding = 'md',
  size = 'md',
  isCentered = true,
  className,
  children,
  ...props
}: BoundedProps<T>): React.JSX.Element => {
  const Comp = as ?? 'section';

  return (
    <Comp
      className={twMerge(
        clsx(
          '',
          paddingVariants[padding],
          sizeVariants[size],
          isCentered && 'mx-auto',
          className,
        ),
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
