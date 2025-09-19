import type { Meta, StoryObj } from '@storybook/react-vite';
import Typography from './typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    background: {
      default: 'black',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const h1: Story = {
  args: {
    variant: 'h1',
    children: 'Titre 1',
  },
};

export const h2: Story = {
  args: {
    variant: 'h2',
    children: 'Titre 2',
  },
};

export const h3: Story = {
  args: {
    variant: 'h3',
    children: 'Titre 3',
  },
};

export const h4: Story = {
  args: {
    variant: 'h4',
    children: 'Titre 4',
  },
};

export const h5: Story = {
  args: {
    variant: 'h5',
    children: 'Titre 5',
  },
};

export const h6: Story = {
  args: {
    variant: 'h6',
    children: 'Titre 6',
  },
};

export const p: Story = {
  args: {
    variant: 'p',
    children: 'Paragraphe',
  },
};

export const span: Story = {
  args: {
    variant: 'span',
    children: 'Span',
  },
};

export const small: Story = {
  args: {
    variant: 'small',
    children: 'Petit texte',
  },
};

export const xsmall: Story = {
  args: {
    variant: 'xsmall',
    children: 'Très petit texte',
  },
};
