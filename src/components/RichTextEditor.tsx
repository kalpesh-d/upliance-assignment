import { Box } from "@chakra-ui/react";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "./MenuBar";
import { toaster } from "./ui/toaster";
import { RootState } from "../store/store";
import {
  setContent,
  setHasUnsavedChanges,
  saveContent,
} from "../store/slices/editorSlice";

const RichTextEditor = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.editor.content);
  const hasUnsavedChanges = useSelector(
    (state: RootState) => state.editor.hasUnsavedChanges
  );

  const handleSave = (editor: Editor) => {
    const newContent = editor?.getHTML() ?? "";
    dispatch(setContent(newContent));
    dispatch(saveContent());
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
      dispatch(setHasUnsavedChanges(true));
      const newContent = editor?.getHTML() ?? "";
      dispatch(setContent(newContent));
    },
  });

  return (
    <Box border="1px solid" borderColor="gray.200" borderRadius="2xl" p={4}>
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
