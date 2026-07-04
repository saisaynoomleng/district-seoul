import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreateMilestoneForm } from './CreateMilestoneForm';
import { mockFormAction } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof CreateMilestoneForm> = {
  title: 'Features/Admin/CreateMilestoneForm',
  component: CreateMilestoneForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Create Milestone Form',
      },
    },
  },

  args: {
    action: mockFormAction,
  },

  argTypes: {
    action: {
      control: false,
      description: 'Server Action to render in Next.js',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <CreateMilestoneForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    const nameEn = canvas.getByRole('textbox', {
      name: /slogan in english/i,
    });
    const nameKo = canvas.getByRole('textbox', {
      name: /slogan in korean/i,
    });
    const slug = canvas.getByRole('textbox', {
      name: /slug/i,
    });
    const slugBtn = canvas.getByRole('button', {
      name: /generate/i,
    });
    const year = canvas.getByRole('spinbutton', {
      name: /year/i,
    });
    const bodyEn = canvas.getByRole('textbox', {
      name: /description in english/i,
    });
    const bodyKo = canvas.getByRole('textbox', {
      name: /description in korean/i,
    });
    const submit = canvas.getByRole('button', {
      name: /create/i,
    });

    await expect(nameEn).toBeInTheDocument();
    await expect(nameKo).toBeInTheDocument();
    await expect(slug).toBeInTheDocument();
    await expect(slugBtn).toBeInTheDocument();
    await expect(year).toBeInTheDocument();
    await expect(bodyEn).toBeInTheDocument();
    await expect(bodyKo).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(nameEn, 'Hey English');
    await userEvent.type(nameKo, 'Hey Korean');
    await userEvent.click(slugBtn);
    await userEvent.type(year, '2025');
    await userEvent.type(bodyEn, 'Description in english');
    await userEvent.type(bodyKo, 'Description in korean');
    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      nameEn: 'Hey English',
      nameKo: 'Hey Korean',
      slug: 'hey-english',
      year: 2025,
      bodyEn: 'Description in english',
      bodyKo: 'Description in korean',
    });
  },
};
