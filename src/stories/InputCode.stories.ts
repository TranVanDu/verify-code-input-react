import type { Meta, StoryObj } from '@storybook/react';

import InputCode from '../components/verify-code/InputCode';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/InputCode',
  component: InputCode,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof InputCode>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const InputCodeText: Story = {
  args: {
    type: 'text',
    fields: 6,
  },
};

export const InputCodePassword: Story = {
  args: {
    type: 'password',
    fields: 6,
  },
};

export const InputCodeNumber: Story = {
  args: {
    type: 'number',
    fields: 6,
  },
};
