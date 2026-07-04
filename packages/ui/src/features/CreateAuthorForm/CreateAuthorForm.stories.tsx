import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateAuthorForm } from './CreateAuthorForm';
import { expect, fn } from 'storybook/test';
import { ActionResponse, CreateAuthorFormValues } from '@district-seoul/utils';
import { mockImageFile } from '#lib/mockData';

const mockAction = fn(
  async (
    data: CreateAuthorFormValues,
  ): Promise<ActionResponse<CreateAuthorFormValues>> => {
    return {
      success: true,
      message: 'Author created!',
    };
  },
);

const mockImageUpload = fn(async () => {
  return 'Test Image Id';
});

const meta: Meta<typeof CreateAuthorForm> = {
  title: 'Features/Admin/CreateAuthorForm',
  component: CreateAuthorForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Create Author Form',
      },
    },
  },

  args: {
    action: mockAction,
    imageUploadAction: mockImageUpload,
  },
  argTypes: {
    action: {
      control: false,
      description: 'Server Action to render in Next.js',
    },

    imageUploadAction: {
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
  render: (args) => <CreateAuthorForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const name = canvas.getByLabelText(/author name/i);
    const generateSlug = canvas.getByRole('button', {
      name: /generate slug button/i,
    });
    const slug = canvas.getByRole('textbox', {
      name: /^slug$/i,
    });
    const bioEn = canvas.getByLabelText(/author bio in english/i);
    const bioKo = canvas.getByLabelText(/author bio in korean/i);
    const specializedIn = canvas.getByLabelText(/specialized in/i);
    const socialLink = canvas.getByLabelText(/social media url/i);
    const imageAssetId = canvas.getByLabelText(/upload author image/i);
    const imageAlt = canvas.getByLabelText(/image alt text/i);
    const submit = canvas.getByRole('button', {
      name: /create/i,
    });

    await expect(name).toBeInTheDocument();
    await expect(generateSlug).toBeInTheDocument();
    await expect(slug).toBeInTheDocument();
    await expect(bioEn).toBeInTheDocument();
    await expect(bioKo).toBeInTheDocument();
    await expect(specializedIn).toBeInTheDocument();
    await expect(socialLink).toBeInTheDocument();
    await expect(imageAssetId).toBeInTheDocument();
    await expect(imageAlt).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(name, 'John Doe');
    await userEvent.click(generateSlug);
    await userEvent.type(bioEn, 'Bio in english');
    await userEvent.type(bioKo, 'Bio in korean');
    await userEvent.type(specializedIn, 'Fashion');
    await userEvent.type(socialLink, 'https://www.facebook.com');
    await userEvent.upload(imageAssetId, mockImageFile);
    await userEvent.type(imageAlt, 'image alt text');

    await userEvent.click(submit);

    await expect(mockAction).toHaveBeenCalledWith({
      name: 'John Doe',
      slug: 'john-doe-author',
      bioEn: 'Bio in english',
      bioKo: 'Bio in korean',
      specializedIn: 'Fashion',
      socialLink: 'https://www.facebook.com',
      imageAssetId: 'Test Image Id',
      imageAlt: 'image alt text',
    });
  },
};
