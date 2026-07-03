import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterForm } from './NewsletterForm';
import { expect, fn } from 'storybook/test';
import {
  ActionResponse,
  NewsletterFormSchemaValues,
} from '@district-seoul/utils';

const mockAction = fn(
  async (
    data: NewsletterFormSchemaValues,
  ): Promise<ActionResponse<NewsletterFormSchemaValues>> => {
    return {
      success: true,
      message: 'success',
    };
  },
);

const meta: Meta<typeof NewsletterForm> = {
  title: 'Features/Web/NewsletterForm',
  component: NewsletterForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Newsletter Subscription Form',
      },
    },
  },
  args: {
    action: mockAction,
  },
  argTypes: {
    action: {
      control: false,
      description: 'Server Action to render in Next.js',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <NewsletterForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText(/email/i);
    const btn = canvas.getByRole('button');

    await expect(input).toBeInTheDocument();
    await expect(btn).toBeInTheDocument();

    await userEvent.type(input, 'johndoe@mail.com');
    await userEvent.click(btn);

    await expect(mockAction).toHaveBeenCalledWith({
      email: 'johndoe@mail.com',
    });
  },
};
