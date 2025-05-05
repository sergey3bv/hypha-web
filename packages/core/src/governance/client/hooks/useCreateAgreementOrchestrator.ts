'use client';

import useSWR from 'swr';
import { z } from 'zod';
import { produce } from 'immer';
import React, { useCallback } from 'react';

import { useAgreementMutationsWeb2Rsc } from './useAgreementMutations.web2.rsc';
import useSWRMutation from 'swr/mutation';
import {
  schemaCreateAgreement,
  schemaCreateAgreementFiles,
  schemaCreateAgreementWeb2,
} from '../../validation';
import { useAgreementFileUploads } from './useAgreementFileUploads';

type UseCreateAgreementOrchestratorInput = {
  authToken?: string | null;
};

export type TaskName =
  | 'CREATE_WEB2_AGREEMENT'
  | 'UPLOAD_FILES'
  | 'UPDATING_CREATED_AGREEMENT';

export type TaskState = {
  [K in TaskName]: {
    status: TaskStatus;
    message?: string;
  };
};

export enum TaskStatus {
  IDLE = 'idle',
  IS_PENDING = 'isPending',
  IS_DONE = 'isDone',
  ERROR = 'error',
}

const taskActionDescriptions: Record<TaskName, string> = {
  CREATE_WEB2_AGREEMENT: 'Creating Web2 agreement...',
  UPLOAD_FILES: 'Uploading Agreement Files...',
  UPDATING_CREATED_AGREEMENT: 'Updating created agreement',
};

export type ProgressAction =
  | { type: 'START_TASK'; taskName: TaskName; message?: string }
  | { type: 'COMPLETE_TASK'; taskName: TaskName; message?: string }
  | { type: 'SET_ERROR'; taskName: TaskName; message: string }
  | { type: 'RESET' };

const initialTaskState: TaskState = {
  CREATE_WEB2_AGREEMENT: { status: TaskStatus.IDLE },
  UPLOAD_FILES: { status: TaskStatus.IDLE },
  UPDATING_CREATED_AGREEMENT: { status: TaskStatus.IDLE },
};

export const progressStateReducer = (
  state: TaskState,
  action: ProgressAction,
): TaskState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'START_TASK':
        draft[action.taskName].status = TaskStatus.IS_PENDING;
        if (action.message) {
          draft[action.taskName].message = action.message;
        }
        break;
      case 'COMPLETE_TASK':
        draft[action.taskName].status = TaskStatus.IS_DONE;
        if (action.message) {
          draft[action.taskName].message = action.message;
        }
        break;
      case 'SET_ERROR':
        draft[action.taskName].status = TaskStatus.ERROR;
        draft[action.taskName].message = action.message;
        break;
      case 'RESET':
        return initialTaskState;
    }
  });
};

const computeProgress = (tasks: TaskState): number => {
  const taskList = Object.values(tasks);
  const totalTasks = taskList.length;
  if (totalTasks === 0) return 0;
  const completedTasks = taskList.filter(
    (t) => t.status === TaskStatus.IS_DONE,
  ).length;
  const inProgressTasks =
    taskList.filter((t) => t.status === TaskStatus.IS_PENDING).length * 0.5;
  const progress = ((completedTasks + inProgressTasks) / totalTasks) * 100;
  return Math.min(100, Math.max(0, Math.round(progress)));
};

export const useCreateAgreementOrchestrator = ({
  authToken,
}: UseCreateAgreementOrchestratorInput) => {
  const agreementFiles = useAgreementFileUploads(authToken);
  const web2 = useAgreementMutationsWeb2Rsc(authToken);

  const [taskState, dispatch] = React.useReducer(
    progressStateReducer,
    initialTaskState,
  );
  const progress = computeProgress(taskState);
  const [currentAction, setCurrentAction] = React.useState<string>();

  const startTask = useCallback((taskName: TaskName) => {
    const action = taskActionDescriptions[taskName];
    setCurrentAction(action);
    dispatch({ type: 'START_TASK', taskName, message: action });
  }, []);

  const completeTask = useCallback(
    (taskName: TaskName) => {
      if (currentAction === taskActionDescriptions[taskName])
        setCurrentAction(undefined);
      dispatch({ type: 'COMPLETE_TASK', taskName });
    },
    [currentAction],
  );

  const errorTask = useCallback(
    (taskName: TaskName, error: string) => {
      if (currentAction === taskActionDescriptions[taskName])
        setCurrentAction(undefined);
      dispatch({ type: 'SET_ERROR', taskName, message: error });
    },
    [currentAction],
  );

  const resetTasks = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const { trigger: createAgreement } = useSWRMutation(
    'createAgreementOrchestration',
    async (_, { arg }: { arg: z.infer<typeof schemaCreateAgreement> }) => {
      startTask('CREATE_WEB2_AGREEMENT');
      const inputCreateAgreementWeb2 = schemaCreateAgreementWeb2.parse(arg);
      await web2.createAgreement(inputCreateAgreementWeb2);
      completeTask('CREATE_WEB2_AGREEMENT');

      startTask('UPLOAD_FILES');
      const inputFiles = schemaCreateAgreementFiles.parse(arg);
      await agreementFiles.upload(inputFiles);
      completeTask('UPLOAD_FILES');
    },
  );

  const { data: updatedWeb2Agreement } = useSWR(
    web2.createdAgreement?.slug && agreementFiles.files
      ? [
          web2.createdAgreement.slug,
          agreementFiles.files,
          'updatingCreatedAgreement',
        ]
      : null,
    async ([slug, uploadedFiles]) => {
      try {
        startTask('UPDATING_CREATED_AGREEMENT');
        const result = await web2.updateAgreementBySlug({
          slug,
          attachments: uploadedFiles.attachments
            ? Array.isArray(uploadedFiles.attachments)
              ? uploadedFiles.attachments
              : [uploadedFiles.attachments]
            : [],
          leadImage: uploadedFiles.leadImage,
        });
        completeTask('UPDATING_CREATED_AGREEMENT');
        return result;
      } catch (error) {
        if (error instanceof Error) {
          errorTask('UPDATING_CREATED_AGREEMENT', error.message);
        }
        throw error;
      }
    },
  );

  const errors = React.useMemo(() => {
    return [web2.errorCreateAgreementMutation].filter(Boolean);
  }, [web2.errorCreateAgreementMutation]);

  const reset = useCallback(() => {
    resetTasks();
    web2.resetCreateAgreementMutation();
  }, []);

  return {
    reset,
    createAgreement,
    agreement: {
      ...web2.createdAgreement,
    },
    taskState,
    currentAction,
    progress,
    isPending: progress > 0 && progress < 100,
    isError: errors.length > 0,
    errors,
  };
};
