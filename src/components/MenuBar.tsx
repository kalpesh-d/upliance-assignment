import { Flex, IconButton } from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Italic as ItalicIcon,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
  RemoveFormatting,
  TextQuote,
  Underline as UnderlineIcon,
  CodeXml,
  X,
} from "lucide-react";

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Flex justifyContent="space-between">
      <Flex gap={2}>
        <IconButton
          size="sm"
          variant={editor.isActive("bold") ? "solid" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Bold />
        </IconButton>
        <IconButton
          aria-label="Toggle italic"
          size="sm"
          variant={editor.isActive("italic") ? "solid" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <ItalicIcon />
        </IconButton>
        <IconButton
          size="sm"
          variant={editor.isActive("strike") ? "solid" : "outline"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </IconButton>
        <IconButton
          size="sm"
          variant={editor.isActive("underline") ? "solid" : "outline"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon />
        </IconButton>
        <IconButton
          size="sm"
          variant={editor.isActive("code") ? "solid" : "outline"}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
        >
          <Code />
        </IconButton>
        <IconButton
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <RemoveFormatting />
        </IconButton>
        <IconButton
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <X />
        </IconButton>
        <IconButton
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "solid" : "outline"}
        >
          <List />
        </IconButton>
        <IconButton
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "solid" : "outline"}
        >
          <ListOrdered />
        </IconButton>
        <IconButton
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive("blockquote") ? "solid" : "outline"}
        >
          <TextQuote />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive("codeBlock") ? "solid" : "outline"}
        >
          <CodeXml />
        </IconButton>
      </Flex>
      <Flex>
        <IconButton
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo />
        </IconButton>
        <IconButton
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default MenuBar;
