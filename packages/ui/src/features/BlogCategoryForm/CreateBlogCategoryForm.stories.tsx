import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateBlogCategoryForm } from './CreateBlogCategoryForm';
import { mockFormAction } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof CreateBlogCategoryForm> = {
  title: 'Features/Admin/CreateBlogCategoryForm',
  component: CreateBlogCategoryForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Create Category Form',
      },
    },
  },

  args: {
    action: mockFormAction,
  },

  argTypes: {
    action: {
      control: false,
      description: 'Server Action to be rendered in Next.js',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledFormed: Story = {
  render: (args) => <CreateBlogCategoryForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const nameEn = canvas.getByRole('textbox', {
      name: /category name in english/i,
    });
    const nameKo = canvas.getByRole('textbox', {
      name: /category name in korean/i,
    });
    const slug = canvas.getByRole('textbox', {
      name: /slug/i,
    });
    const generate = canvas.getByRole('button', {
      name: /generate/i,
    });
    const submit = canvas.getByRole('button', {
      name: /create/i,
    });

    await expect(nameEn).toBeInTheDocument();
    await expect(nameKo).toBeInTheDocument();
    await expect(slug).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();
    await expect(generate).toBeInTheDocument();

    await userEvent.type(nameEn, 'Fashion in English');
    await userEvent.type(nameKo, 'Fashion in Korean');
    await userEvent.click(generate);
    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      nameEn: 'Fashion in English',
      nameKo: 'Fashion in Korean',
      slug: 'fashion-in-english',
    });
  },
};
