import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@hypha-platform/ui-utils';

const headingVariants = cva(
  'font-family-inherit font-medium leading-tight m-0',
  {
    variants: {
      size: {
        1: 'text-[14px] leading-tight',  // h9
        2: 'text-[16px] leading-tight',  // h8
        3: 'text-[18px] leading-tight',  // h7
        4: 'text-[20px] leading-tight',  // h6
        5: 'text-[24px] leading-tight',  // h5
        6: 'text-[30px] leading-tight',  // h4
        7: 'text-[36px] leading-tight',  // h3
        8: 'text-[48px] leading-tight',  // h2
        9: 'text-[60px] leading-tight',  // h1
      },
      weight: {
        regular: 'font-normal',
        bold: 'font-bold',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      color: {
        primary: 'text-black',
        secondary: 'text-gray-500',
      },
    },
    defaultVariants: {
      size: 1,
      weight: 'bold',
      align: 'left',
      color: 'primary',
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, weight, align, color, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h1';
    return (
      <Comp
        className={cn(headingVariants({ size, weight, align, color, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
