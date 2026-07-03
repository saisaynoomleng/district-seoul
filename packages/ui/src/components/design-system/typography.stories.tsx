import type { Meta } from '@storybook/react-vite';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'DesignSystem/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Docs = {
  render: () => <Typography />,
};
