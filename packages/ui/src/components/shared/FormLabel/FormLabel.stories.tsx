import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormLabel } from './FormLabel';
import { expect } from 'storybook/test';
import { Input } from '#components/ui/input';

const meta: Meta<typeof FormLabel> = {
  title: 'Components/Shared/FormLabel',
  component: FormLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Label component for input components with defined classes',
      },
    },
  },

  args: {
    htmlFor: 'email',
  },

  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'Specified id for an input',
    },

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
  render: (args) => <FormLabel {...args}>Email</FormLabel>,
  play: async ({ canvas }) => {
    const label = canvas.getByText(/email/i);

    await expect(label).toBeInTheDocument();
    await expect(label).toHaveAttribute('for', 'email');
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div className="space-y-2">
      <FormLabel {...args} htmlFor="fullname">
        Full Name
      </FormLabel>
      <Input type="text" id="fullname" />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const label = canvas.getByText(/full name/i);
    const input = canvas.getByRole('textbox', { name: /full name/i });

    await userEvent.click(label);

    await expect(input).toHaveFocus();
    await expect(label).toHaveAttribute('for', 'fullname');
    await expect(input).toBeInTheDocument();

    await userEvent.type(input, 'John Doe');

    await expect(input).toHaveValue('John Doe');
  },
};
