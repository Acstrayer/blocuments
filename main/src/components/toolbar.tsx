import GridBloc from "../components/gridBloc";
import SheetBloc from "../components/sheetBloc";
import TextBloc from "../components/textBloc";
import { EditorContent, useEditor } from "@tiptap/react";

interface toolbarProps {
  addBloc: Function;
  editor: any;
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
    const editor = props.editor;
    props.addBloc(<TextBloc editor={editor} />);
  };

  return (
    <section id="Toolbar">
      <button onClick={addSheetBloc}>Add Sheet Bloc</button>
      <button onClick={addTextBloc}>Add Text Bloc</button>
    </section>
  );
}
