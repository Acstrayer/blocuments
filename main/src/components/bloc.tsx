import React, { useEffect, useRef, useState, useContext } from "react";
import { GridContext } from "../context/GridContext";

type BlocProps = {
  children: JSX.Element|JSX.Element[];
};

type Coordinates = {
  left: number;
  top: number;
};

type Size = {
  width: number;
  height: number;
};

export default function Bloc(props: BlocProps) {
  //Context
  const nodeRef = useRef<HTMLDivElement>(null);
  const scale = useContext(GridContext);

  //States
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [coords, setCoords] = useState<Coordinates>({ left: 0, top: 0 });
  const [size, setSize] = useState<Size>({
    width: (nodeRef.current?.getBoundingClientRect().width || 0) - 2,
    height: (nodeRef.current?.getBoundingClientRect().height || 0) - 2,
  });
  const [gridPos, setGridPos] = useState("1 / 1 / 6 / 13");

  //Click on wrapped object, save original position
  //Save diff for dragend.
  const dragStart = (e: any) => {
    const currentLeft =
      e.currentTarget.parentElement.getBoundingClientRect().left -
      e.currentTarget.parentElement.parentElement.getBoundingClientRect().left;
    const currentTop =
      e.currentTarget.parentElement.getBoundingClientRect().top -
      e.currentTarget.parentElement.parentElement.getBoundingClientRect().top;
    setDiffX(e.screenX - currentLeft);
    setDiffY(e.screenY - currentTop);
    setSize({
      width: e.currentTarget.parentElement.getBoundingClientRect().width - 2,
      height: e.currentTarget.parentElement.getBoundingClientRect().height - 2,
    });
    setIsDragging(true);
  };
  //Rerender and position wrapped, dragged object while dragging on cursor
  const dragging = (e: any) => {
    if (isDragging) {
      var left = e.screenX - diffX;
      var top = e.screenY - diffY;
      setCoords({
        left: left,
        top: top,
      });
    }
  };
  //row start / column start / row end / column end
  //Drop object to nearest anchor point
  const dragEnd = () => {
    const rect = nodeRef.current?.getBoundingClientRect();
    const gridRect = nodeRef.current?.parentElement?.getBoundingClientRect();
    const snapLeft =
      Math.round(((rect?.left || 0) - (gridRect?.left || 0)) / scale) + 1;
    const snapTop =
      Math.round(((rect?.top || 0) - (gridRect?.top || 0)) / scale) + 1;
    const colsWide = Math.ceil((rect?.width || 0) / scale);
    const rowsHigh = Math.ceil((rect?.height || 0) / scale);
    setGridPos(
      snapTop.toString() +
        " / " +
        snapLeft.toString() +
        " / " +
        (snapTop + rowsHigh).toString() +
        " / " +
        (snapLeft + colsWide).toString()
    );
    console.log(
      snapTop.toString() +
        " / " +
        snapLeft.toString() +
        " / " +
        (snapTop + rowsHigh).toString() +
        " / " +
        (snapLeft + colsWide).toString()
    );
    setIsDragging(false);
  };

  useEffect(() => {
    let childRef: any = null;
    if (nodeRef.current) {
      childRef = nodeRef.current.firstChild;
      if (childRef) {
        childRef.addEventListener("mousedown", dragStart);
        document.addEventListener("mouseup", dragEnd);
      }
    }
    return () => {
      if (childRef) {
        childRef.removeEventListener("mousedown", dragStart);
      }
      document.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragEnd);
    };
  });

  document.addEventListener("mousemove", dragging);

  return (
    <div
      className={isDragging ? "bloc dragging" : "bloc"}
      style={
        isDragging
          ? {
              left: coords.left,
              top: coords.top,
              width: size.width,
              height: size.height,
            }
          : { gridArea: gridPos }
      }
      ref={nodeRef}
    >
      <div className="dragHandle">DRAG ME</div>
      {props.children}
    </div>
  );
}
