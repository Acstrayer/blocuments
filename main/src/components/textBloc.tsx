import { EditorContent, useEditor } from "@tiptap/react";
import TextMenuBar from "./textMenuBar";
import Bloc from "../components/bloc";
import StarterKit from "@tiptap/starter-kit";
import { useReducer, useState } from "react";

export default function TextBloc() {
  const [isFocused, setFocus] = useState(false);
  const editor = useEditor({
    onFocus({ editor, event }) {
      console.log("clicked!");
      setFocus(true);
    },
    onBlur({ editor, event }) {
      console.log("unclicked!");
      setFocus(false);
    },
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
      <div
        style={
          isFocused
            ? {
                display: "inline",
              }
            : { display: "none" }
        }
      >
        <TextMenuBar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </Bloc>
  );
}
