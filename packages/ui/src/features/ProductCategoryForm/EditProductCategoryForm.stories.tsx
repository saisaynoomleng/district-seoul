import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  mockFormAction,
  mockImageFile,
  mockImageUploadAction,
  mockProductCategory,
} from '#lib/mockData';
import { expect } from 'storybook/test';
import { EditProductCategoryForm } from './EditProductCategoryForm';

const meta: Meta<typeof EditProductCategoryForm> = {
  title: 'Features/Admin/EditProductCategoryForm',
  component: EditProductCategoryForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Edit Product Category Form',
      },
    },
  },

  args: {
    action: mockFormAction,
    imageUploadAction: mockImageUploadAction,
    category: mockProductCategory,
  },
  argTypes: {
    action: {
      control: false,
      description: 'Sever Action to be rendered in Next.js',
    },

    imageUploadAction: {
      control: false,
      description: 'Server Action to be rendered in Next.js',
    },

    category: {
      control: false,
      description: 'Initial Product Category Data',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <EditProductCategoryForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const nameEn = canvas.getByRole('textbox', {
      name: /category name in english/i,
    });
    const nameKo = canvas.getByRole('textbox', {
      name: /category name in korean/i,
    });
    const generateSlug = canvas.getByRole('button', {
      name: /generate/i,
    });
    const slug = canvas.getByRole('textbox', {
      name: /slug/i,
    });
    const imageAlt = canvas.getByRole('textbox', {
      name: /image alternative text/i,
    });
    const assetId = canvas.getByLabelText(/upload an image/i);
    const submit = canvas.getByRole('button', {
      name: /edit/i,
    });

    await expect(nameEn).toBeInTheDocument();
    await expect(nameKo).toBeInTheDocument();
    await expect(slug).toBeInTheDocument();
    await expect(generateSlug).toBeInTheDocument();
    await expect(imageAlt).toBeInTheDocument();
    await expect(assetId).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.clear(nameEn);
    await userEvent.clear(nameKo);
    await userEvent.clear(imageAlt);

    await userEvent.type(nameEn, 'Name in english Edited');
    await userEvent.type(nameKo, 'Name in Korean Edited');
    await userEvent.click(generateSlug);
    await userEvent.type(imageAlt, 'Image Alt Text Edited');
    await userEvent.upload(assetId, mockImageFile);
    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      nameEn: 'Name in english Edited',
      nameKo: 'Name in Korean Edited',
      slug: 'name-in-english-edited',
      imageAlt: 'Image Alt Text Edited',
      imageAssetId: 'image file',
    });
  },
};
