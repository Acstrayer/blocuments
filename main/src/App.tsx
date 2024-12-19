import { useState } from 'react';
import logo from './logo.svg';
import SheetBloc from './components/spreadsheet'
import './App.css';

function App() {
  for (let i = 0; i < 24; i++) {
    let n = i.toString;
    let row = <div className="Guide rowGuides" style={"gridArea: 1 / 1 / 1 / -1"}></div>
  }

  const rowGuides = Array(31).fill(<div className="Guide colGuides"></div>);
  const colGuides = Array(24).fill(<div className="Guide rowGuides"></div>);

  const spreadsheetData = [
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
  ];
  const [sheets, setSheets] = useState([<SheetBloc cells={spreadsheetData} dark />]);
  const addSheetBloc = () => {
    setSheets([...sheets, <SheetBloc cells={spreadsheetData} dark />]);
  }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <section id="Grid">
          {rowGuides}
          {colGuides}
        </section>

        {sheets}
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
