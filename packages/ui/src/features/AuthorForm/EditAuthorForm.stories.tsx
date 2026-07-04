import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditAuthorForm } from './EditAuthorForm';
import {
  mockAuthor,
  mockFormAction,
  mockImageFile,
  mockImageUploadAction,
} from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof EditAuthorForm> = {
  title: 'Features/Admin/EditAuthorForm',
  component: EditAuthorForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Edit Author Form',
      },
    },
  },

  args: {
    author: mockAuthor,
    action: mockFormAction,
    imageUploadAction: mockImageUploadAction,
  },

  argTypes: {
    author: {
      control: false,
      description: "Initial Author's Info",
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    action: {
      control: false,
      description: 'Server Action to be render in Next.js',
    },

    imageUploadAction: {
      control: false,
      description: 'Server Action to be render in Next.js',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <EditAuthorForm {...args} />,
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
      name: /edit/i,
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

    await userEvent.clear(name);
    await userEvent.clear(slug);
    await userEvent.clear(bioEn);
    await userEvent.clear(bioKo);
    await userEvent.clear(specializedIn);
    await userEvent.clear(socialLink);
    await userEvent.clear(imageAlt);

    await userEvent.type(name, 'Joe Doe');
    await userEvent.click(generateSlug);
    await userEvent.type(bioEn, 'Bio in english for Joe Doe');
    await userEvent.type(bioKo, 'Bio in korean for Joe Doe');
    await userEvent.type(specializedIn, 'Fashion Joe Doe');
    await userEvent.type(socialLink, 'https://www.facebook.com/joe-doe');
    await userEvent.upload(imageAssetId, mockImageFile);
    await userEvent.type(imageAlt, 'image alt text');

    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      name: 'Joe Doe',
      slug: 'joe-doe-author',
      bioEn: 'Bio in english for Joe Doe',
      bioKo: 'Bio in korean for Joe Doe',
      specializedIn: 'Fashion Joe Doe',
      socialLink: 'https://www.facebook.com/joe-doe',
      imageAssetId: 'image file',
      imageAlt: 'image alt text',
    });
  },
};
