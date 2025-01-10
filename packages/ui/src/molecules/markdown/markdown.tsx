import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';
import { ComponentMap } from './content-map';
import { Suspense } from 'react';
import { ProseWrapper as DefaultProseWrapper } from './prose-wrapper';

type MarkdownProps = {
  content: string;
  components?: MDXComponents;
  ProseWrapper?: React.ComponentType<{ children: React.ReactNode }>;
};
export const Markdown = ({
  content,
  components = ComponentMap,
  ProseWrapper = DefaultProseWrapper,
}: MarkdownProps) => {
  return (
    <ProseWrapper>
      <MDXRemote source={content} components={components} />
    </ProseWrapper>
  );
};

export const MarkdownSuspense = ({
  content,
  components = ComponentMap,
  FallBack = <div>Loading...</div>,
}: MarkdownProps & { FallBack?: React.ReactNode }) => {
  return (
    <Suspense fallback={FallBack}>
      <Markdown content={content} components={components} />
    </Suspense>
  );
};
