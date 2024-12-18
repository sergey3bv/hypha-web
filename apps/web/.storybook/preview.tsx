import '@hypha-platform/ui-utils/global.css';

// THANK GOD FOR THIS FIX
// https://github.com/storybookjs/storybook/issues/23684#issuecomment-1682143610
import { unoptimizeNextImageForStorybook } from '@hypha-platform/ui';
unoptimizeNextImageForStorybook();
