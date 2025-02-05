import { Box } from "@chakra-ui/react";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import { STORAGE_KEY } from "../App";
import { toaster } from "./ui/toaster";

interface RichTextEditorProps {
  content: string;
  setContent: (content: string) => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (value: boolean) => void;
}

const RichTextEditor = ({
  content,
  setContent,
  hasUnsavedChanges,
  setHasUnsavedChanges,
}: RichTextEditorProps) => {
  const handleSave = (editor: Editor) => {
    const newContent = editor?.getHTML() ?? "";
    setContent(newContent);
    localStorage.setItem(STORAGE_KEY, newContent);
    setHasUnsavedChanges(false);
    toaster.create({
      title: "Content saved",
      description: "Your editor content has been saved",
      type: "success",
    });
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    editorProps: {
      attributes: {
        class: "tiptap",
      },
    },
    onUpdate: ({ editor }) => {
      setHasUnsavedChanges(true);
      const newContent = editor?.getHTML() ?? "";
      setContent(newContent);
    },
  });

  return (
    <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
      {editor && (
        <MenuBar
          editor={editor}
          onSave={() => handleSave(editor)}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      )}
      <Box mt={2}>
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default RichTextEditor;
