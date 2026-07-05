import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditBlogCategoryForm } from './EditBlogCategoryForm';
import { mockBlogCategory, mockFormAction } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof EditBlogCategoryForm> = {
  title: 'Features/Admin/EditBlogCategoryForm',
  component: EditBlogCategoryForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Admin Dashboard: Edit Blog Category Form`,
      },
    },
  },

  args: {
    category: mockBlogCategory,
    action: mockFormAction,
  },

  argTypes: {
    action: {
      control: false,
      description: 'Server Action to be rendered in Next.js',
    },

    category: {
      control: false,
      description: 'Initial Blog Category data',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <EditBlogCategoryForm {...args} />,
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
      name: /edit/i,
    });

    await expect(nameEn).toBeInTheDocument();
    await expect(nameKo).toBeInTheDocument();
    await expect(slug).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();
    await expect(generate).toBeInTheDocument();

    await userEvent.clear(nameEn);
    await userEvent.clear(nameKo);

    await userEvent.type(nameEn, 'Fashion in English English');
    await userEvent.type(nameKo, 'Fashion in Korean Korean');
    await userEvent.click(generate);
    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      nameEn: 'Fashion in English English',
      nameKo: 'Fashion in Korean Korean',
      slug: 'fashion-in-english-english',
    });
  },
};
