import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditStoreForm } from './EditStoreForm';
import {
  mockFormAction,
  mockImageFile,
  mockImageUploadAction,
  mockStore,
} from '#lib/mockData';
import { expect } from 'storybook/test';

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

  args: {
    store: mockStore,
    action: mockFormAction,
    imageUploadAction: mockImageUploadAction,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <EditStoreForm {...args} />,
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

    await userEvent.clear(reasonEn);
    await userEvent.clear(reasonKo);
    await userEvent.clear(nameEn);
    await userEvent.clear(nameKo);
    await userEvent.clear(imgAlt);
    await userEvent.clear(email);
    await userEvent.clear(phone);
    await userEvent.clear(street);
    await userEvent.clear(city);
    await userEvent.clear(zip);
    await userEvent.clear(state);
    await userEvent.clear(country);
    await userEvent.clear(latitude);
    await userEvent.clear(longitude);

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
    await userEvent.type(reasonEn, 'Reason in English Edited');
    await userEvent.type(reasonKo, 'Reason in Korean Edited');
    await userEvent.upload(img, mockImageFile);
    await userEvent.type(imgAlt, 'image alt text Edited');
    await userEvent.type(email, 'storeedited@mail.com');
    await userEvent.type(phone, '1 234 567 8901');
    await userEvent.type(street, 'Street Edited');
    await userEvent.type(city, 'City Edited');
    await userEvent.type(zip, '100000 Edited');
    await userEvent.type(state, 'State Edited');
    await userEvent.type(country, 'Country Edited');
    await userEvent.type(latitude, '10000000000');
    await userEvent.type(longitude, '99999');

    await userEvent.click(
      canvas.getByRole('button', {
        name: /edit/i,
      }),
    );
  },
};
