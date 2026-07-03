import type { Meta, StoryObj } from '@storybook/react-vite';
import { YouTubeEmbedded } from './YouTubeEmbedded';
import { youtubeId } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof YouTubeEmbedded> = {
  title: 'Components/Shared/YoutubeEmbedded',
  component: YouTubeEmbedded,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Render Video Component with YouTube ID',
      },
    },
  },

  args: {
    videoId: youtubeId,
    title: 'Skateboard video',
  },

  argTypes: {
    videoId: {
      control: 'text',
      description: 'YouTube Video ID',
    },

    title: {
      control: 'text',
      description: 'Video title for screen reader',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const iframe = canvas.getByTestId('iframe');

    await expect(iframe).toBeInTheDocument();
    await expect(iframe).toHaveAttribute('title', 'Skateboard video');
  },
};
