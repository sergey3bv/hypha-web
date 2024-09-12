'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { Markdown } from 'tiptap-markdown';
import StarterKit from '@tiptap/starter-kit';
import { EditorMenu } from './editor-menu';

export const Editor = () => {
  const element = document.querySelector('#proposal');
  console.debug('Editor', {element});
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: '# Hello Tiptap!',
    onUpdate: ({ editor }) =>
      console.debug('Editor content has been updated', {
        json: editor.getJSON(),
        markdown: editor.storage.markdown.getMarkdown(),
      }),
  });

  return (
    <>
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};
