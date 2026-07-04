import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { LabelInfoText } from './LabelInfoText';

const meta: Meta<typeof LabelInfoText> = {
  title: 'Components/Shared/LabelInfoText',
  component: LabelInfoText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'For displaying helper text under form label',
      },
    },
  },

  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    text: {
      control: 'text',
      description: 'Helper Text',
    },

    id: {
      control: 'text',
      description: 'Reference ID for the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <LabelInfoText
      {...args}
      text="Slug is required to generate a page on the website"
    />
  ),
  play: async ({ canvas }) => {
    const p = canvas.getByText(
      /slug is required to generate a page on the website/i,
    );

    await expect(p).toBeInTheDocument();
    await expect(p).toHaveTextContent(
      'Slug is required to generate a page on the website',
    );
  },
};
