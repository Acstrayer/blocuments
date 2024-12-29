import { useState } from "react";
import Spreadsheet from "react-spreadsheet";
import Bloc from "./bloc";

interface CellProps {
  cells: any[][];
  dark?: boolean;
}

export default function SheetBloc(props: CellProps) {
  const [cells, setCells] = useState(props.cells);
  const addRow = () => {
    setCells([...cells, []]);
  };
  const addCol = () => {
    setCells([[...cells[0], {}], ...cells.slice(1)]);
  };
  return (
    <Bloc>
      <Spreadsheet data={cells} darkMode={props.dark} onChange={setCells} />
      <button onClick={addCol}>Add Column</button>
      <br />
      <button onClick={addRow}>Add Row</button>
    </Bloc>
  );
}
