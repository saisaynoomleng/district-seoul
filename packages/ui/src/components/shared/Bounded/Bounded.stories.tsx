import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bounded } from './Bounded';
import { expect } from 'storybook/test';

const meta: Meta<typeof Bounded> = {
  title: 'Components/Shared/Bounded',
  component: Bounded,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Semantic Wrapper component with specified classes',
      },
    },
  },

  args: {
    as: 'section',
    padding: 'md',
    size: 'md',
    isCentered: true,
  },

  argTypes: {
    as: {
      control: false,
      table: {
        type: {
          summary: `Determine React ElementType which is default to SECTION`,
          detail: `
                    as?: T extends React.ElementType
                `,
        },
      },
    },

    padding: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Add horizontal padding to the component',
          detail: `
            none: '',
            sm: 'px-4 md:px-6 lg:px-8 py-2',
            md: 'px-6 md:px-8 lg:px-10 py-4',
            lg: 'px-8 md:px-10 lg:px-12 py-6',
          `,
        },
      },
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'full'],
      table: {
        type: {
          summary: `Determine the maximum width of the component`,
          detail: `
            sm: 'max-w-4xl',
            md: 'max-w-7xl',
            full: 'max-w-none', 
            `,
        },
      },
    },

    isCentered: {
      control: 'boolean',
      description:
        'Determine whether the component is auto center to the middle base on the screen width & maximum width',
    },

    className: {
      control: 'text',
      description: `Additional TailwindCSS classes`,
    },

    children: {
      control: false,
      description: 'Render any React Node',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Bounded {...args}>
      <h1>Heading</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
        doloremque provident fuga quidem magnam neque officiis voluptates
        delectus vitae in?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
        atque.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, et
        in. Obcaecati esse similique ipsam natus quas molestiae dolore eius.
      </p>
    </Bounded>
  ),
  play: async ({ canvas }) => {
    const p = canvas.getAllByRole('paragraph');
    const heading = canvas.getByRole('heading');

    await expect(heading).toBeInTheDocument();
    await expect(heading).toHaveTextContent('Heading');
    await expect(p).toHaveLength(3);
  },
};
