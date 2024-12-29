import { createContext, useState, CSSProperties } from "react";
import { GridContext } from "../context/GridContext";

type GridProps = {
  dark?: boolean;
  x: number;
  y: number;
  density?: number;
  children: JSX.Element[];
};

export interface GridCSS extends CSSProperties {
  "--num-rows": number;
  "--num-cols": number;
}

export default function GridBloc(props: GridProps) {
  //TO DO: MAKE DYNAMIC
  const panelWidth: number = 840;
  const scale: number = panelWidth / props.x;
  //Variables

  //States
  const [rows, setRows] = useState(props.y);
  const [cols, setCols] = useState(props.x);
  const [gridScale, setGridScale] = useState(scale);
  //Instantiate grid guide arrays
  let rowGuides: JSX.Element[] = [];
  let colGuides: JSX.Element[] = [];
  //Cast i to a string, then create JSX element for the row guides
  //Assign the row guides to a grid area, start at row 1 : col 1
  //End at row i : col -1 (the end of the grid) grid-area: "1/1/1/-1"
  //Create a series of horizontal slices that cover entire grid
  for (let i = 1; i <= rows; i++) {
    let n = i.toString();
    if (i > 1) {
      rowGuides.push(
        <div
          className="Guide rowGuide"
          style={{ gridArea: n + " / 2 / " + n + " / -1" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
              left: "-3px",
              top: "-3px",
            }}
          >
            <defs>
              <pattern
                id="dots"
                height="100%"
                width={((scale * 100) / (panelWidth - scale)).toString() + "%"}
              >
                <circle cx="3" cy="3" r="3px" fill="#999999A1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)"></rect>
          </svg>
        </div>
      );
    } else {
      rowGuides.push(
        <div
          className="Guide rowGuide"
          style={{ gridArea: n + " / 1 / " + n + " / -1" }}
        ></div>
      );
    }
  }
  //Same as rows, but the other direction lol
  for (let i = 1; i <= cols; i++) {
    let n = i.toString();
    colGuides.push(
      <div
        className="Guide colGuide"
        style={{ gridArea: "1 / " + n + " / -1 / " + n }}
      ></div>
    );
  }

  const addRow = () => {
    setRows(rows + 1);
  };

  const addCol = () => {
    setCols(cols + 1);
  };

  return (
    <div>
      <section
        id="Grid"
        style={{ "--num-rows": rows, "--num-cols": cols } as GridCSS}
      >
        {rowGuides}
        {colGuides}

        <GridContext.Provider value={gridScale}>
          {props.children}
        </GridContext.Provider>
      </section>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addCol}>Add Column</button>
    </div>
  );
}
