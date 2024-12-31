import { EditorContent, useEditor } from "@tiptap/react";
import { useState } from "react";
import TextEditor from "../components/textEditor";
import Bloc from "../components/bloc";

interface textBlocProps {
  editor: any;
}

export default function TextBloc(props: textBlocProps) {
  const editor = props.editor;
  return (
    <Bloc>
      <EditorContent editor={editor} />
    </Bloc>
  );
}
