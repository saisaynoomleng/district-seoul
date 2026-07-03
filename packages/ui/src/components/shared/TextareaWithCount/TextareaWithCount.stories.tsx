import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextareaWithCount } from './TextareaWithCount';
import { expect } from 'storybook/test';

const meta: Meta<typeof TextareaWithCount> = {
  title: 'Components/Shared/TextareaWithCount',
  component: TextareaWithCount,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Textarea for forms, but with text count',
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MaxLength5000: Story = {
  render: (args) => <TextareaWithCount {...args} id="test" maxLength={5000} />,
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByRole('textbox');

    await expect(textarea).toHaveValue('');
    await expect(textarea).toHaveAttribute('maxLength', '5000');

    await userEvent.type(textarea, 'Hello Testing!');

    await expect(textarea).toHaveValue('Hello Testing!');
  },
};
