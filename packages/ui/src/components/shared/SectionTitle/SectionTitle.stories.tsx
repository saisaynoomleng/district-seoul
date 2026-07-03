import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionTitle } from './SectionTitle';
import { expect } from 'storybook/test';

const meta: Meta<typeof SectionTitle> = {
  title: 'Components/Shared/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Title for Different sections on the web page',
      },
    },
  },

  args: {
    label1: 'California',
    label2: 'Reggae & Rasta',
  },
  argTypes: {
    as: {
      control: 'radio',
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Determine different heading tags',
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        type: {
          summary: `Determine different font sizes`,
          detail: `
            sm: 'text-fs-500 md:text-fs-600 lg:text-fs-700',
            md: 'text-fs-600 md:text-fs-700 lg:text-fs-800',
            lg: 'text-fs-700 md:text-fs-800 lg:text-fs-900',
            `,
        },
      },
    },

    label1: {
      control: 'text',
      description: 'Title text without font weight',
    },

    label2: {
      control: 'text',
      description: 'Title text with font weight',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SectionTitle {...args} />,
};

export const Separted: Story = {
  render: (args) => <SectionTitle {...args} separated={true} />,
  play: async ({ canvas }) => {
    const label1 = canvas.getByText(/california/i);
    const label2 = canvas.getByText(/reggae & rasta/i);

    await expect(label1).toBeInTheDocument();
    await expect(label2).toBeInTheDocument();
    await expect(label1).toHaveTextContent('California');
    await expect(label2).toHaveTextContent('Reggae & Rasta');
  },
};
