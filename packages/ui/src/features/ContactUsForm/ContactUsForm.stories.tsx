import {
  ActionResponse,
  ContactUsFormSchemaValues,
} from '@district-seoul/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { ContactUsForm } from './ContactUsForm';

const mockAction = fn(
  async (
    data: ContactUsFormSchemaValues,
  ): Promise<ActionResponse<ContactUsFormSchemaValues>> => {
    return {
      success: true,
      message: 'success!',
    };
  },
);

const meta: Meta<typeof ContactUsForm> = {
  title: 'Features/Web/ContactUsForm',
  component: ContactUsForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Contact Us Form',
      },
    },
  },

  args: { action: mockAction },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    action: {
      control: false,
      description: 'Server Action to render in Next.js',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <ContactUsForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const fullName = canvas.getByLabelText(/full name/i);
    const email = canvas.getByLabelText(/email/i);
    const phone = canvas.getByLabelText(/phone/i);
    const subject = canvas.getByLabelText(/subject/i);
    const message = canvas.getByLabelText(/message/i);
    const btn = canvas.getByRole('button');

    await expect(fullName).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(phone).toBeInTheDocument();
    await expect(subject).toBeInTheDocument();
    await expect(message).toBeInTheDocument();
    await expect(btn).toBeInTheDocument();

    await userEvent.type(fullName, 'John Doe');
    await userEvent.type(email, 'johndoe@mail.com');
    await userEvent.type(phone, '+1 234 567 8901');
    await userEvent.type(subject, 'Test Subject');
    await userEvent.type(
      message,
      'Test message Test message Test message Test message Test message Test message Test message Test message Test message Test message Test message Test message Test message',
    );
    await userEvent.click(btn);

    await expect(mockAction).toHaveBeenCalledWith({
      fullName: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '+1 234 567 8901',
      subject: 'Test Subject',
      message:
        'Test message Test message Test message Test message Test message Test message Test message Test message Test message Test message Test message Test message Test message',
    });
  },
};
