import React, { ComponentProps } from 'react';
import { PrimaryDetailCardView as Resources } from '@app/Resources/Resources';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Support',
  component: Resources,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Resources>> = (args) => <Resources {...args} />;

export const ResourcesStory = Template.bind({});
ResourcesStory.args = {
  /*👇 The args you need here will depend on your component */
};
