import { fileRouter } from '@hypha-platform/core/server';
import { createRouteHandler } from 'uploadthing/next';

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
});
