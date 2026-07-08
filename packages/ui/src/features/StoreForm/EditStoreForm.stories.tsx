import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditStoreForm } from './EditStoreForm';

const meta: Meta<typeof EditStoreForm> = {
  title: 'Features/Admin/EditStoreForm',
  component: EditStoreForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Author Dashboard: Edit Store Form`,
      },
    },
  },

  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;
