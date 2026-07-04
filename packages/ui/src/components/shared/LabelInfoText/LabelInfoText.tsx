import clsx from 'clsx';
import React from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

type LabelInfoTextProps = {
  id: string;
  className?: string;
  text: string;
};

export const LabelInfoText = ({
  id,
  className,
  text,
}: LabelInfoTextProps): React.JSX.Element => {
  return (
    <p
      id={id}
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
