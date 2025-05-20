'use client';

import type { ForwardedRef } from 'react';
import {
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  linkPlugin,
  BlockTypeSelect,
} from '@mdxeditor/editor';

import '@mdxeditor/editor/style.css';

export function RichTextEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      className="prose max-w-full"
      plugins={[
        // Example Plugin Usage
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex gap-1 grow text-lg">
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <div className="grow" />
              <UndoRedo />
            </div>
          ),
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
