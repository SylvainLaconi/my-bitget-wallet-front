import Button from './button';
import { fn } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FaSearch } from 'react-icons/fa';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { onClick: fn() },
  parameters: {
    docs: {
      description: {
        component: 'Button component',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onClick: fn(),
    disabled: false,
    children: 'Button',
  },
};

export const PrimaryLoading: Story = {
  args: {
    onClick: fn(),
    disabled: false,
    children: 'Button',
    isLoading: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    onClick: fn(),
    disabled: true,
    children: 'Button',
  },
};

export const PrimaryIcon: Story = {
  args: {
    onClick: fn(),
    disabled: false,
    children: 'Button',
    icon: <FaSearch />,
  },
};

export const PrimarySmall: Story = {
  args: {
    onClick: fn(),
    disabled: false,
    children: 'Button',
    size: 'small',
  },
};

export const Secondary: Story = {
  args: {
    onClick: fn(),
    disabled: false,
    children: 'Button',
    size: 'large',
    variant: 'secondary',
  },
};

export const SecondaryLoading: Story = {
  args: {
    onClick: fn(),
    disabled: false,
    children: 'Button',
    isLoading: true,
    variant: 'secondary',
  },
};

export const SecondaryDisabled: Story = {
  args: {
    onClick: fn(),
    disabled: true,
    children: 'Button',
    variant: 'secondary',
  },
};

export const SecondaryIcon: Story = {
  args: {
    onClick: fn(),
    disabled: false,
    children: 'Button',
    icon: <FaSearch />,
    variant: 'secondary',
  },
};

export const SecondarySmall: Story = {
  args: {
    onClick: fn(),
    disabled: false,
    children: 'Button',
    size: 'small',
    variant: 'secondary',
  },
};
