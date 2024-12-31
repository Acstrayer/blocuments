import React from "react";
import { useState } from "react";
import GridBloc from "./components/gridBloc";
import Toolbar from "./components/toolbar";
import TextEditor from "./components/textEditor";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

import "./App.css";

function App() {
  const gridElements: JSX.Element[] = [];
  const [blocs, setBlocs] = useState(gridElements);

  const addBloc = (element: JSX.Element) => {
    setBlocs([...blocs, element]);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
  });

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Toolbar addBloc={addBloc} editor={editor} />
        <TextEditor editor={editor} />
        <GridBloc x={24} y={31}>
          {blocs}
        </GridBloc>
      </main>
    </div>
  );
}

export default App;
