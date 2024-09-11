import { Button as RadixButton } from '@radix-ui/themes';
import type { ButtonProps } from '@radix-ui/themes';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <RadixButton {...props}>{children}</RadixButton>;
};
