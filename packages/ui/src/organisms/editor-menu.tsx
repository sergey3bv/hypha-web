import * as Toolbar from '@radix-ui/react-toolbar';
import { BubbleMenu } from '@tiptap/react';
import type { Editor } from '@tiptap/react';

import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
} from '@radix-ui/react-icons';

type EditorMenuProps = {
  editor: Editor | null;
};

export const EditorMenu: React.FC<EditorMenuProps> = ({ editor }) => {
  return (
    editor && (
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Toolbar.Root
          className="flex p-[10px] w-full min-w-max rounded-md bg-white shadow-lg"
          aria-label="Formatting options"
        >
          <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
            <Toolbar.ToggleItem
              className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
              value="bold"
              aria-label="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <FontBoldIcon />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
              value="italic"
              aria-label="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <FontItalicIcon />
            </Toolbar.ToggleItem>
            <Toolbar.ToggleItem
              className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
              value="strikethrough"
              aria-label="Strike through"
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <StrikethroughIcon />
            </Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>
          <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
        </Toolbar.Root>
      </BubbleMenu>
    )
  );
};
