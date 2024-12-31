import React, { useEffect, useRef, useState, useContext } from "react";
import { GridContext } from "../context/GridContext";

type BlocProps = {
  children: JSX.Element | JSX.Element[];
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
  const [scrollPos, setScrollPos] = useState(0);
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
    let blocelem = e.currentTarget.parentElement
    const currentLeft =
      blocelem.getBoundingClientRect().left -
      blocelem.parentElement.getBoundingClientRect().left;
    const currentTop =
      blocelem.getBoundingClientRect().top -
      blocelem.parentElement.getBoundingClientRect().top;
    setDiffX(e.screenX - currentLeft);
    setDiffY(e.screenY - currentTop);
    setScrollPos(window.scrollY);
    setSize({
      width: blocelem.getBoundingClientRect().width - 2,
      height: blocelem.getBoundingClientRect().height - 2,
    });
    setIsDragging(true);
    document.body.classList.add("no-select");
  };
  //Rerender and position wrapped, dragged object while dragging on cursor
  const dragging = (e: any) => {
    if (isDragging) {
      var left = e.screenX - diffX;
      var top = e.screenY + (window.scrollY - scrollPos) - diffY;
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
        (snapLeft + colsWide).toString(),
    );
    console.log(
      snapTop.toString() +
        " / " +
        snapLeft.toString() +
        " / " +
        (snapTop + rowsHigh).toString() +
        " / " +
        (snapLeft + colsWide).toString(),
    );
    setIsDragging(false);
    document.body.classList.remove("no-select");
  };

  useEffect(() => {
    window.addEventListener("mousemove", dragging);
    let dragHandle: any = null;
    if (nodeRef.current) {
      dragHandle = nodeRef.current.firstChild;
      if (dragHandle) {
        dragHandle.addEventListener("mousedown", dragStart);
        window.addEventListener("mouseup", dragEnd);
      }
    }
    return () => {
      if (dragHandle) {
        dragHandle.removeEventListener("mousedown", dragStart);
      }
      window.removeEventListener("mousemove", dragging);
      window.removeEventListener("mouseup", dragEnd);
    };
  });

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
      <div className="dragHandle">
        <div className="resizeNode topEdge"></div>
        <div className="resizeNode topLeft"></div>
        <div className="resizeNode topRight"></div>
        <div className="resizeNode leftEdge"></div>
        <div className="resizeNode rightEdge"></div>
        <div className="resizeNode bottomLeft"></div>
        <div className="resizeNode bottomRight"></div>
        <div className="resizeNode bottomEdge"></div>
      </div>
      {props.children}
    </div>
  );
}
