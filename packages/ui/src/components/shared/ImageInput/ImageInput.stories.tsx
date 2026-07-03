import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageInput } from './ImageInput';
import { expect } from 'storybook/test';

const meta: Meta<typeof ImageInput> = {
  title: 'Components/Shared/ImageInput',
  component: ImageInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Image File Form Input',
      },
    },
  },

  args: {
    id: 'image',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    id: {
      control: 'text',
      description: 'ID for the label to refer to',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ImageInput {...args} />,
  play: async ({ canvas }) => {
    const input = canvas.getByTestId('image-input');

    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute('id', 'image');
  },
};
