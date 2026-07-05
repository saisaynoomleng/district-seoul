import type { Meta } from '@storybook/react-vite';
import { PortableTextEditor } from './PortableTextEditor';

const meta: Meta<typeof PortableTextEditor> = {
  title: 'Components/Shared/PortableTextEditor',
  component: PortableTextEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      decription: {
        component: 'Portable Text Editor Input',
      },
    },
  },
};

export default meta;

export const Default = {
  render: () => <PortableTextEditor />,
};
