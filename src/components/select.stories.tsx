import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from './select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    background: {
      default: 'black',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: 'Paris', label: 'Paris' },
      { value: 'Lyon', label: 'Lyon' },
      { value: 'Marseille', label: 'Marseille' },
    ],
    name: 'select',
    placeholder: '--Selectionner une option--',
    onChange: (value) => {
      console.log(value);
    },
  },
};
