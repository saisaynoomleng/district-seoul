import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormErrorMessage } from './FormErrorMessage';
import { expect } from 'storybook/test';

const meta: Meta<typeof FormErrorMessage> = {
  title: 'Components/Shared/FormErrorMessage',
  component: FormErrorMessage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'For displaying error messages under the input forms',
      },
    },
  },

  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    children: {
      control: false,
      description: 'Render any React Node',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FormErrorMessage {...args}>Must be a valid email address</FormErrorMessage>
  ),
  play: async ({ canvas }) => {
    const p = canvas.getByRole('alert');

    await expect(p).toBeInTheDocument();
    await expect(p).toHaveTextContent('Must be a valid email address');
  },
};
