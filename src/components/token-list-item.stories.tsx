import TokenListItem from './token-list-item';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/TokenListItem',
  component: TokenListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof TokenListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    coin: {
      token: { name: 'Token', ticker: 'TOKEN' },
      tokenId: '1',
      available: 100,
      frozen: 10,
      locked: 20,
      limitAvailable: 70,
      uTime: 1716235200,
      earnQuantity: 10,
      valueUSD: 100,
      lastPrice: 1.23,
      change24hPercent: 10.23,
    },
  },
};

export const Mobile: Story = {
  globals: {
    viewport: {
      value: 'mobile2',
      isRotated: false,
    },
  },
  args: {
    coin: {
      token: { name: 'Token', ticker: 'TOKEN' },
      tokenId: '1',
      available: 100,
      frozen: 10,
      locked: 20,
      limitAvailable: 70,
      uTime: 1716235200,
      earnQuantity: 10,
      valueUSD: 100,
      lastPrice: 1.23,
      change24hPercent: 10.23,
    },
  },
};
