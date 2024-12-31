import React from "react";
import { useState } from "react";
import GridBloc from "./components/gridBloc";
import Toolbar from "./components/toolbar";
import TextMenuBar from "./components/textMenuBar";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

import "./App.css";

function App() {
  const gridElements: JSX.Element[] = [];
  const [blocs, setBlocs] = useState(gridElements);

  const addBloc = (element: JSX.Element) => {
    setBlocs([...blocs, element]);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Toolbar addBloc={addBloc} />
        <GridBloc x={24} y={31}>
          {blocs}
        </GridBloc>
      </main>
    </div>
  );
}

export default App;
