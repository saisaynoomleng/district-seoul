import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateStoreForm } from './CreateStoreForm';
import {
  mockFormAction,
  mockImageFile,
  mockImageUploadAction,
} from '#lib/mockData';
import { expect } from 'storybook/test';

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

export const FilledForm: Story = {
  render: (args) => <CreateStoreForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const nameEn = canvas.getByRole('textbox', {
      name: /store name in english/i,
    });
    const nameKo = canvas.getByRole('textbox', {
      name: /store name in korean/i,
    });
    const generateSlug = canvas.getByRole('button', {
      name: /generate/i,
    });
    const openingHours = canvas.getAllByLabelText(/opening hours/i);
    const closingHours = canvas.getAllByLabelText(/closing hours/i);
    const isOpen = canvas.getByRole('checkbox', {
      name: /is the store open/i,
    });
    const reasonEn = canvas.getByRole('textbox', {
      name: /reason for closing in english/i,
    });
    const reasonKo = canvas.getByRole('textbox', {
      name: /reason for closing in korean/i,
    });
    const img = canvas.getByLabelText(/upload an image/i);
    const imgAlt = canvas.getByRole('textbox', {
      name: /image alternative text/i,
    });
    const email = canvas.getByRole('textbox', {
      name: /email/i,
    });
    const phone = canvas.getByRole('textbox', {
      name: /phone/i,
    });
    const street = canvas.getByRole('textbox', {
      name: /street address/i,
    });
    const city = canvas.getByRole('textbox', {
      name: /city address/i,
    });
    const zip = canvas.getByRole('textbox', {
      name: /zip\/postal code/i,
    });
    const state = canvas.getByRole('textbox', {
      name: /state address/i,
    });
    const country = canvas.getByRole('textbox', {
      name: /country/i,
    });
    const latitude = canvas.getByRole('spinbutton', {
      name: /latitude/i,
    });
    const longitude = canvas.getByRole('spinbutton', {
      name: /longitude/i,
    });

    await expect(nameEn).toBeInTheDocument();
    await expect(nameKo).toBeInTheDocument();
    await expect(generateSlug).toBeInTheDocument();
    await expect(openingHours).toHaveLength(7);
    await expect(closingHours).toHaveLength(7);
    await expect(reasonEn).toBeInTheDocument();
    await expect(reasonKo).toBeInTheDocument();
    await expect(img).toBeInTheDocument();
    await expect(imgAlt).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(phone).toBeInTheDocument();
    await expect(street).toBeInTheDocument();
    await expect(zip).toBeInTheDocument();
    await expect(city).toBeInTheDocument();
    await expect(state).toBeInTheDocument();
    await expect(country).toBeInTheDocument();
    await expect(latitude).toBeInTheDocument();
    await expect(longitude).toBeInTheDocument();

    await userEvent.type(nameEn, 'store in english');
    await userEvent.type(nameKo, 'store in korean');
    await userEvent.click(generateSlug);

    for (let i = 0; i < 7; i++) {
      await userEvent.type(
        canvas.getByTestId(`storeHours.${i}.openingHours`),
        `08:00`,
      );
      await userEvent.type(
        canvas.getByTestId(`storeHours.${i}.closingHours`),
        '17:30',
      );
    }

    await userEvent.click(isOpen);
    await userEvent.type(reasonEn, 'Reason in English');
    await userEvent.type(reasonKo, 'Reason in Korean');
    await userEvent.upload(img, mockImageFile);
    await userEvent.type(imgAlt, 'image alt text');
    await userEvent.type(email, 'store@mail.com');
    await userEvent.type(phone, '1 234 567 8901');
    await userEvent.type(street, 'Street');
    await userEvent.type(city, 'City');
    await userEvent.type(zip, '100000');
    await userEvent.type(state, 'State');
    await userEvent.type(country, 'Country');
    await userEvent.type(latitude, '100');
    await userEvent.type(longitude, '-100');

    await userEvent.click(
      canvas.getByRole('button', {
        name: /create/i,
      }),
    );
  },
};
