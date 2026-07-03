import React from 'react';
import { Bounded } from '../Bounded';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type YouTubeEmbeddedProps = {
  className?: string;
  videoId: string;
  title: string;
};

export const YouTubeEmbedded = ({
  className,
  videoId,
  title,
}: YouTubeEmbeddedProps): React.JSX.Element => {
  return (
    <Bounded
      as="div"
      padding="none"
      size="full"
      isCentered={false}
      className={twMerge(
        clsx('w-full aspect-video rounded-lg relative', className),
      )}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=0&fs=0&rel=0&disablekb=1&iv_load_policy=3`}
        allow="accelerometer; autoplay;  encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
        loading="lazy"
        className="pointer-events-none aspect-video border-0 saturate-0 rounded-lg brandBoxShadow videoPlayerClipPath relative z-10"
        data-testid="iframe"
      />
      <div className="videoPlayerClipPath w-full h-full bg-brand-success-500 absolute inset-0 translate-x-2 translate-y-2" />
      <div className="videoPlayerClipPath w-full h-full bg-brand-black-800 absolute inset-0 translate-x-4 translate-y-4 -z-10 dark:bg-brand-black-600" />
    </Bounded>
  );
};
