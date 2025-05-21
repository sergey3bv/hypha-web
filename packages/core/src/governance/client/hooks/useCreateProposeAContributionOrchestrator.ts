'use client';

import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Config } from '@wagmi/core';
import { z } from 'zod';

import {
  schemaCreateAgreement,
  schemaCreateAgreementWeb2,
  schemaCreateAgreementFiles,
} from '../../validation';

import { useAgreementFileUploads } from './useAgreementFileUploads';
import { useAgreementMutationsWeb2Rsc } from './useAgreementMutations.web2.rsc';
import { useProposeAContributionMutationsWeb3Rpc } from './useProposeAContributionMutations.web3.rsc';
import { useOrchestratorTasks } from './useOrchestratorTasks';

type CreateProposeAContributionArg = z.infer<typeof schemaCreateAgreement> & {
  payouts: { amount: string; token: string }[];
  recipient: string;
  web3SpaceId?: number;
};

export const useCreateProposeAContributionOrchestrator = ({
  authToken,
  config,
}: {
  authToken?: string | null;
  config?: Config;
}) => {
  const agreementFiles = useAgreementFileUploads(authToken);
  const web2 = useAgreementMutationsWeb2Rsc(authToken);
  const web3 = useProposeAContributionMutationsWeb3Rpc(config);

  const {
    taskState,
    currentAction,
    progress,
    startTask,
    completeTask,
    errorTask,
    resetTasks,
  } = useOrchestratorTasks({ authToken });

  const { trigger: createProposeAContribution } = useSWRMutation(
    'createProposeAContributionOrchestration',
    async (_: string, { arg }: { arg: CreateProposeAContributionArg }) => {
      startTask('CREATE_WEB2_AGREEMENT');
      const inputWeb2 = schemaCreateAgreementWeb2.parse(arg);
      const createdAgreement = await web2.createAgreement(inputWeb2);
      completeTask('CREATE_WEB2_AGREEMENT');

      const web2Slug = createdAgreement?.slug ?? web2.createdAgreement?.slug;
      const web3SpaceId = arg.web3SpaceId;

      try {
        if (config && typeof web3SpaceId === 'number') {
          startTask('CREATE_WEB3_AGREEMENT');
          await web3.createProposeAContribution({
            spaceId: web3SpaceId,
            payouts: arg.payouts,
            recipient: arg.recipient,
          });
          completeTask('CREATE_WEB3_AGREEMENT');
        }
      } catch (err) {
        if (web2Slug) {
          await web2.deleteAgreementBySlug({ slug: web2Slug });
        }
        throw err;
      }

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
          web3.createdProposeAContribution?.proposalId,
          'linkingWeb2AndWeb3',
        ]
      : null,
    async ([slug, uploadedFiles, web3ProposalId]) => {
      try {
        startTask('LINK_WEB2_AND_WEB3_AGREEMENT');
        const result = await web2.updateAgreementBySlug({
          slug,
          web3ProposalId: web3ProposalId ? Number(web3ProposalId) : undefined,
          attachments: uploadedFiles.attachments
            ? Array.isArray(uploadedFiles.attachments)
              ? uploadedFiles.attachments
              : [uploadedFiles.attachments]
            : [],
          leadImage: uploadedFiles.leadImage,
        });
        completeTask('LINK_WEB2_AND_WEB3_AGREEMENT');
        return result;
      } catch (error) {
        if (error instanceof Error) {
          errorTask('LINK_WEB2_AND_WEB3_AGREEMENT', error.message);
        }
        throw error;
      }
    },
  );

  const errors = useMemo(
    () =>
      [
        web2.errorCreateAgreementMutation,
        web3.errorCreateProposeAContribution,
        web3.errorWaitProposeAContributionFromTransaction,
      ].filter(Boolean),
    [web2, web3],
  );

  const reset = useCallback(() => {
    resetTasks();
    web2.resetCreateAgreementMutation();
    web3.resetCreateProposeAContributionMutation();
  }, [resetTasks, web2, web3]);

  return {
    reset,
    createProposeAContribution,
    agreement: {
      ...updatedWeb2Agreement,
      ...web3.createdProposeAContribution,
    },
    taskState,
    currentAction,
    progress,
    isPending: progress > 0 && progress < 100,
    isError: errors.length > 0,
    errors,
  };
};
