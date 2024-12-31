import GridBloc from "../components/gridBloc";
import SheetBloc from "../components/sheetBloc";
import TextBloc from "../components/textBloc";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface toolbarProps {
  addBloc: Function;
}

export default function Toolbar(props: toolbarProps) {
  const addSheetBloc = () => {
    const spreadsheetData = [
      [{ value: "" }, { value: "" }],
      [{ value: "" }, { value: "" }],
    ];
    props.addBloc(<SheetBloc cells={spreadsheetData} dark />);
  };
  const addTextBloc = () => {
    props.addBloc(<TextBloc />);
  };

  return (
    <section id="Toolbar">
      <button onClick={addSheetBloc}>Add Sheet Bloc</button>
      <button onClick={addTextBloc}>Add Text Bloc</button>
    </section>
  );
}
