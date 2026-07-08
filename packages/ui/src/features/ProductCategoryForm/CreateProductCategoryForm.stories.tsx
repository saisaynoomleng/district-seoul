import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateProductCategoryForm } from './CreateProductCategoryForm';
import {
  mockFormAction,
  mockImageFile,
  mockImageUploadAction,
} from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof CreateProductCategoryForm> = {
  title: 'Features/Admin/CreateProductCategoryForm',
  component: CreateProductCategoryForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Create Product Category Form',
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
      description: 'Sever Action to be rendered in Next.js',
    },

    imageUploadAction: {
      control: false,
      description: 'Server Action to be rendered in Next.js',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <CreateProductCategoryForm {...args} />,
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
      name: /create/i,
    });

    await expect(nameEn).toBeInTheDocument();
    await expect(nameKo).toBeInTheDocument();
    await expect(slug).toBeInTheDocument();
    await expect(generateSlug).toBeInTheDocument();
    await expect(imageAlt).toBeInTheDocument();
    await expect(assetId).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(nameEn, 'Name in english');
    await userEvent.type(nameKo, 'Name in Korean');
    await userEvent.click(generateSlug);
    await userEvent.type(imageAlt, 'Image Alt Text');
    await userEvent.upload(assetId, mockImageFile);
    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      nameEn: 'Name in english',
      nameKo: 'Name in Korean',
      slug: 'name-in-english',
      imageAlt: 'Image Alt Text',
      imageAssetId: 'image file',
    });
  },
};
