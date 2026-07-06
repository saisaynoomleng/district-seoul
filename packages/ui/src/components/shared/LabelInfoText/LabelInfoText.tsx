import clsx from 'clsx';
import React from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

type LabelInfoTextProps = {
  className?: string;
  text?: string;
};

export const LabelInfoText = ({
  className,
  text = 'Slug is required to generate a page on the website',
}: LabelInfoTextProps): React.JSX.Element => {
  return (
    <p
      className={twMerge(
        clsx(
          'flex gap-x-1 text-fs-300 items-center text-brand-accent-700 dark:text-brand-accent-300',
          className,
        ),
      )}
    >
      <span>
        <FaCircleInfo aria-hidden={true} />
      </span>
      <span>{text}</span>
    </p>
  );
};
