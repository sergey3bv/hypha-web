import { cn } from '@hypha-platform/ui-utils';
import { badgeVariants, parameters } from './badge';

describe('badgeVariants', () => {
  const sizes = [1, 2, 3] as const;
  const variants = ['solid', 'soft', 'outline', 'surface'] as const;
  const colorVariants = ['accent', 'error', 'warn', 'neutral'] as const;

  sizes.forEach((size) => {
    variants.forEach((variant) => {
      colorVariants.forEach((colorVariant) => {
        it(`should apply ${size} ${variant} ${colorVariant} classes`, () => {
          const result = cn(badgeVariants({ size, variant, colorVariant }));

          expect(result).toContain(parameters.size[size].text);
          expect(result).toContain(parameters.size[size].px);
        });
      });
    });
  });
});
