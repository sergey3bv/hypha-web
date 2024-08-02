import { Theme as RadixTheme } from '@radix-ui/themes';
import type { ThemeProps } from '@radix-ui/themes';

export const Theme: React.FC<ThemeProps> = (props) => {
  return (
    <RadixTheme
      accentColor="blue"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      {...props}
    >
      {props.children}
    </RadixTheme>
  );
};
