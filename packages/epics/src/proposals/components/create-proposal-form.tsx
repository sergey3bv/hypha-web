import {
  CreateProposalFormHead,
  CreateProposalFormHeadProps,
} from './create-proposal-form-head';
import {
  Button,
  Skeleton,
  FileUploader,
  Textarea,
  Separator,
  Input,
  Slider,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { SelectItem, SelectMenu } from '@hypha-platform/ui/server';
import { Text } from '@radix-ui/themes';
import { IoLogoUsd } from 'react-icons/io';

import Link from 'next/link';
import React from 'react';

type SelectOption = {
  label: string;
  value: string;
};

export type CreateFormProps = CreateProposalFormHeadProps & {
  closeUrl: string;
  outcomeOptions: SelectOption[];
  numberOfWeekOptions: SelectOption[];
};

export const CreateProposalForm = ({
  creator,
  isLoading,
  closeUrl,
  outcomeOptions,
  numberOfWeekOptions,
}: CreateFormProps) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const [selectedOutcome, setSelectedOption] = React.useState<string>();
  const [selectedNumberOfWeeks, setNumberOfWeeksOption] =
    React.useState<string>();

  const handleOutcomeChange = (newValue: string) => {
    setSelectedOption(newValue);
  };
  const handleNumberOfWeeksChange = (newValue: string) => {
    setNumberOfWeeksOption(newValue);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between">
        <CreateProposalFormHead creator={creator} isLoading={isLoading} />
        <Link href={closeUrl}>
          <Button
            variant="ghost"
            colorVariant="neutral"
            className="flex items-center"
          >
            Close
            <RxCross1 className="ml-2" />
          </Button>
        </Link>
      </div>
      <Skeleton
        width="100%"
        height="100px"
        loading={isLoading}
        className="rounded-lg"
      >
        <FileUploader
          value={files}
          onValueChange={setFiles}
          onUpload={() => Promise.resolve()}
        />
      </Skeleton>
      <Skeleton
        width="100%"
        height="100px"
        loading={isLoading}
        className="rounded-lg"
      >
        <Textarea placeholder="Type a brief description here..." />
      </Skeleton>
      <div className="row mt-1 flex justify-between w-full">
        <Skeleton
          width="62px"
          height="20px"
          loading={isLoading}
          className="rounded-lg"
        >
          <span className="text-2 text-neutral-11 font-medium">Outcome</span>
        </Skeleton>
        <Skeleton
          width="62px"
          height="32px"
          loading={isLoading}
          className="rounded-lg"
        >
          <Select onValueChange={handleOutcomeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Outcome</SelectLabel>

                {outcomeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Skeleton>
      </div>
      {selectedOutcome === 'payment' ? (
        <div>
          <Separator />
          <div className="flex gap-6 flex-col mt-6">
            <div className="flex justify-between">
              <Text className="text-2 text-neutral-11">Economic request</Text>
              <Input
                className="text-2"
                placeholder="Type an amount"
                leftIcon={<IoLogoUsd />}
              />
            </div>
            <div className="flex justify-between">
              <Text className="text-2 text-neutral-11">Number of weeks</Text>
              <Skeleton
                width="62px"
                height="32px"
                loading={isLoading}
                className="rounded-lg"
              >
                <Select onValueChange={handleNumberOfWeeksChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select weeks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {numberOfWeekOptions.map((opt, index) => (
                        <SelectItem
                          key={opt.label + index + opt.value}
                          value={opt.value}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Skeleton>
            </div>
            <div className="flex justify-between">
              <Text className="text-2 text-neutral-11 text-nowrap">
                Deffered percentage
              </Text>
              <Slider displayValue className="ml-4" />
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex justify-end w-full">
        <Skeleton
          width="72px"
          height="35px"
          loading={isLoading}
          className="rounded-lg mr-2"
        >
          <Button
            variant="outline"
            colorVariant="accent"
            className="rounded-lg justify-start w-fit mr-2"
          >
            Save as draft
          </Button>
        </Skeleton>
        <Skeleton
          width="72px"
          height="35px"
          loading={isLoading}
          className="rounded-lg"
        >
          <Button
            variant="default"
            className="rounded-lg justify-start text-white w-fit"
          >
            Publish
          </Button>
        </Skeleton>
      </div>
    </div>
  );
};
