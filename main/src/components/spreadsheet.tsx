import React from 'react';
import Spreadsheet from "react-spreadsheet";

export default function Example() {
  const spreadsheetRef = React.useRef(null);
  const spreadsheetData = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];
  return (
    <div ref={spreadsheetRef} className="Spreadsheet">
      <Spreadsheet data={spreadsheetData} darkMode />
    </div>
  );
}
