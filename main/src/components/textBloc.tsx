import { useState } from "react";
import Bloc from "../components/bloc";
import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface txtProps {
  text?: String
}

const extensions = [StarterKit];



export default function TextBloc(props: txtProps) {
  const [text, setText] = useState("hello world");

  return (
    <Bloc>
        <EditorProvider extensions={extensions} content={text}>
            <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
        </EditorProvider>
    </Bloc>
  );
}
