import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    background: {
      default: 'black',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    type: 'text',
    name: 'input',
    placeholder: 'Saisir le nom',
  },
};

export const EmailInput: Story = {
  args: {
    type: 'email',
    name: 'input',
    placeholder: "Saisir l'email",
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    name: 'input',
    placeholder: 'Saisir le mot de passe',
  },
};

export const SmallInput: Story = {
  args: {
    type: 'text',
    name: 'input',
    placeholder: 'Saisir le nom',
    size: 'small',
  },
};
