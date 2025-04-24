import { cleanPath } from './clean-path';

describe('cleanPath', () => {
  const testCases = [
    {
      input: '/en/dho/my-org/governance/something/else',
      expected: '/en/dho/my-org/governance',
      description: 'should clean path after governance tab',
    },
    {
      input: '/en/dho/my-org/governance/select-settings-action',
      expected: '/en/dho/my-org/governance',
      description: 'should remove settings action after tab',
    },
    {
      input: '',
      expected: '',
      description: 'should handle empty path',
    },
  ];

  testCases.forEach(({ input, expected, description }) => {
    it(description, () => {
      expect(cleanPath(input)).toBe(expected);
    });
  });
});
