import { Theme as RadixTheme } from '@radix-ui/themes';
import type { ThemeProps } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';

export const Theme: React.FC<ThemeProps> = (props) => {
  return (
    <ThemeProvider attribute="class">
      <RadixTheme
        accentColor="indigo"
        grayColor="gray"
        panelBackground="solid"
        scaling="100%"
        className="flex flex-col w-full h-full"
        {...props}
      >
        {props.children}
      </RadixTheme>
    </ThemeProvider>
  );
};
