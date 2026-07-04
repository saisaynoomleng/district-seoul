import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditMilestoneForm } from './EditMilestoneForm';
import { mockFormAction, mockMilestone } from '#lib/mockData';
import { expect } from 'storybook/test';

const meta: Meta<typeof EditMilestoneForm> = {
  title: 'Features/Admin/EditMilestoneForm',
  component: EditMilestoneForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Admin Dashboard: Edit Milestone Form',
      },
    },
  },

  args: {
    milestone: mockMilestone,
    action: mockFormAction,
  },

  argTypes: {
    action: {
      control: false,
      description: 'Server Action to be rendered in Next.js',
    },

    milestone: {
      control: false,
      description: 'Initial Milestone Info',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <EditMilestoneForm {...args} />,
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
      name: /edit/i,
    });

    await expect(nameEn).toBeInTheDocument();
    await expect(nameKo).toBeInTheDocument();
    await expect(slug).toBeInTheDocument();
    await expect(slugBtn).toBeInTheDocument();
    await expect(year).toBeInTheDocument();
    await expect(bodyEn).toBeInTheDocument();
    await expect(bodyKo).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.clear(nameEn);
    await userEvent.clear(nameKo);
    await userEvent.clear(year);
    await userEvent.clear(bodyEn);
    await userEvent.clear(bodyKo);

    await userEvent.type(nameEn, 'Hey English English');
    await userEvent.type(nameKo, 'Hey Korean Korean');
    await userEvent.click(slugBtn);
    await userEvent.type(year, '2027');
    await userEvent.type(bodyEn, 'Description in english english');
    await userEvent.type(bodyKo, 'Description in korean korean');
    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      nameEn: 'Hey English English',
      nameKo: 'Hey Korean Korean',
      slug: 'hey-english-english',
      year: 2027,
      bodyEn: 'Description in english english',
      bodyKo: 'Description in korean korean',
    });
  },
};
