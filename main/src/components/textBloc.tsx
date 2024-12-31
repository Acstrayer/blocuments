import { EditorContent, useEditor } from "@tiptap/react";
import TextMenuBar from "./textMenuBar";
import Bloc from "../components/bloc";
import StarterKit from "@tiptap/starter-kit";

export default function TextBloc() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "Enter Text Here",
    editorProps: {
      attributes: {
        spellcheck: "true",
      },
    },
  });

  return (
    <Bloc>
      <TextMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </Bloc>
  );
}
