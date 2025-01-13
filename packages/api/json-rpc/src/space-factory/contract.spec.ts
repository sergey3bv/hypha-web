import { describe, expect, it } from 'vitest';
import { isMember } from './contract';
import { accounts } from '../accounts.mock';

describe('SpaceFactory Contract', () => {
  describe('isMember', () => {
    it('should return true if a valid member', async () => {
      const spaceId = 17;
      const userAddress = accounts[0].address;

      const response = await isMember(spaceId, userAddress);

      expect(response).toBe(true);
    });
    it('should return false if not a valid member', async () => {
      const spaceId = 17;
      const userAddress = '0x0000000000000000000000000000000000000000';

      const response = await isMember(spaceId, userAddress);

      expect(response).toBe(false);
    });
  });
});
