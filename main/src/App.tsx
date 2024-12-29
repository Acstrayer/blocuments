import React from "react";
import { useState } from "react";
import SheetBloc from "./components/sheetBloc";
import GridBloc from "./components/gridBloc";
import "./App.css";

function App() {
  const spreadsheetData = [
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
  ];
  const [sheets, setSheets] = useState([
    <SheetBloc cells={spreadsheetData} dark />,
  ]);
  const addSheetBloc = () => {
    setSheets([...sheets, <SheetBloc cells={spreadsheetData} dark />]);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <GridBloc x={24} y={31}>
          {sheets}
        </GridBloc>
        <section id="ToolBar">
          <button onClick={addSheetBloc}>Add Sheet Bloc</button>
          {/*
          <button onClick={addTextBloc}>Add Text Bloc</button>
          <button onClick={addImageBloc}>Add Image Bloc</button>
          */}
        </section>
      </main>
    </div>
  );
}

export default App;
