'use client';

import useSWRMutation from 'swr/mutation';
import { useSpaceFileUploads } from './useSpaceFileUploads';
import { useSpaceMutationsWeb2Rsc } from './useSpaceMutations.web2.rsc';
import {
  schemaCreateSpace,
  schemaCreateSpaceFiles,
} from '@core/space/validation';
import { z } from 'zod';
import invariant from 'tiny-invariant';
import React, { useCallback } from 'react';
import {
  TaskStatus,
  taskActionDescriptions,
  initialTaskState,
  progressStateReducer,
  computeProgress,
} from '@core/governance/client/hooks/useOrchestratorTasks';

type UseUpdateSpaceInput = {
  authToken?: string | null;
};

export type TaskName = 'UPDATE_WEB2_SPACE' | 'UPLOAD_FILES';

export const useUpdateSpaceOrchestrator = ({
  authToken,
}: UseUpdateSpaceInput) => {
  const web2 = useSpaceMutationsWeb2Rsc(authToken);
  const files = useSpaceFileUploads(authToken);

  // Use the progressStateReducer to manage task state
  const [taskState, dispatch] = React.useReducer(
    progressStateReducer,
    initialTaskState,
  );

  const progress = computeProgress(taskState);

  const [currentAction, setCurrentAction] = React.useState<string>();

  const startTask = React.useCallback(
    (taskName: TaskName) => {
      const currentAction = taskActionDescriptions[taskName];
      setCurrentAction(currentAction);
      dispatch({
        type: 'START_TASK',
        taskName,
        message: currentAction,
      });
    },
    [dispatch, setCurrentAction],
  );

  const completeTask = React.useCallback(
    (taskName: TaskName) => {
      if (currentAction === taskActionDescriptions[taskName]) {
        setCurrentAction(undefined);
      }
      dispatch({
        type: 'COMPLETE_TASK',
        taskName,
      });
    },
    [dispatch, setCurrentAction, currentAction],
  );

  const errorTask = React.useCallback(
    (taskName: TaskName, error: string) => {
      if (currentAction === taskActionDescriptions[taskName]) {
        setCurrentAction(undefined);
      }
      dispatch({
        type: 'SET_ERROR',
        taskName,
        message: error,
      });
    },
    [dispatch],
  );

  const resetTasks = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const { trigger: updateSpace, isMutating } = useSWRMutation(
    'updateSpaceMutation',
    async (_, { arg }: { arg: z.infer<typeof schemaCreateSpace> }) => {
      try {
        console.debug('updateSpaceMutation', { arg });
        const { slug } = arg;
        invariant(slug, 'slug is required');

        startTask('UPDATE_WEB2_SPACE');
        const inputCreateSpaceFiles = schemaCreateSpaceFiles.parse(arg);
        const urls = await files.upload(inputCreateSpaceFiles);

        const result = await web2.updateSpaceBySlug({ ...arg, ...urls, slug });
        completeTask('UPDATE_WEB2_SPACE');

        return result;
      } catch (error) {
        if (error instanceof Error) {
          if (taskState.UPLOAD_FILES.status === TaskStatus.IS_PENDING) {
            errorTask('UPLOAD_FILES', error.message);
          }
          if (taskState.UPDATE_WEB2_SPACE.status === TaskStatus.IS_PENDING) {
            errorTask('UPDATE_WEB2_SPACE', error.message);
          }
        }
        throw error;
      }
    },
  );

  const errors = React.useMemo(() => {
    return [web2.errorUpdateSpaceBySlugMutation, files.error].filter(Boolean);
  }, [web2.errorUpdateSpaceBySlugMutation, files.error]);

  const reset = React.useCallback(() => {
    resetTasks();
    web2.resetUpdateSpaceBySlugMutation();
    files.reset();
  }, [resetTasks, web2, files]);

  return {
    isMutating,
    updateSpace,
    taskState,
    currentAction,
    progress,
    isPending: progress > 0 && progress < 100,
    isError: errors.length > 0,
    errors,
    reset,
  };
};
