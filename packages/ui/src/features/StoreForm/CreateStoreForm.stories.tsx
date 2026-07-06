import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateStoreForm } from './CreateStoreForm';
import { mockFormAction, mockImageUploadAction } from '#lib/mockData';

const meta: Meta<typeof CreateStoreForm> = {
  title: 'Features/Admin/CreateStoreForm',
  component: CreateStoreForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Create Store Form',
      },
    },
  },

  args: {
    action: mockFormAction,
    imageUploadAction: mockImageUploadAction,
  },

  argTypes: {
    action: {
      control: false,
      description: 'Server action to be rendered in Next.js',
    },

    imageUploadAction: {
      control: false,
      description: 'Server action to be rendered in Next.js',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
