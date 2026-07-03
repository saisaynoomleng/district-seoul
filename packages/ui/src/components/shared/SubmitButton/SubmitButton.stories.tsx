import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { SubmitButton } from './SubmitButton';

const mockAction = fn(async (e: React.SubmitEvent) => {
  e.preventDefault();
  console.log('submitted');
});

const meta: Meta<typeof SubmitButton> = {
  title: 'Components/Shared/SubmitButton',
  component: SubmitButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Submit Button for a form',
      },
    },
  },

  args: {},
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
  render: (args) => <SubmitButton {...args}>Submit</SubmitButton>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');

    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Submit');
  },
};

export const WithForm: Story = {
  render: (args) => (
    <form onSubmit={mockAction} className="space-y-2 border p-4">
      <p>Test Form</p>
      <SubmitButton {...args}>Submit</SubmitButton>
    </form>
  ),
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button');

    await userEvent.click(button);

    await expect(mockAction).toHaveBeenCalled();
  },
};
