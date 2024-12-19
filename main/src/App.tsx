import { useState } from 'react';
import SheetBloc from './components/spreadsheet'
import './App.css';

function App() {
  let rowGuides: JSX.Element[] = [];
  for (let i = 1; i <= 31; i++) {
    let n = i.toString();
    rowGuides.push(<div className="Guide rowGuide" style={{gridArea: n+" / 1 / "+n+" / -1"}}></div>);
  }
  let colGuides: JSX.Element[] = [];
  for (let i = 1; i <= 24; i++) {
    let n = i.toString();
    colGuides.push(<div className="Guide colGuide" style={{gridArea: "1 / "+n+" / -1 / "+n}}></div>);
  }
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
