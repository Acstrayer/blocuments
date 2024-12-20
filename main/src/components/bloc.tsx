import React, { useState } from "react";

type BlocProps = {
  children: JSX.Element[]
}

export default function Bloc(props: BlocProps) {
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [coords, setCoords] = useState({});
  const dragStart = (e: any) => {
    setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);
    setIsDragging(true);
  };
  const dragging = (e: any) => {
    if (isDragging) {
      var left = e.screenX - diffX;
      var top = e.screenY - diffY;
      setCoords({left: left, top: top});
    }
  };
  const dragEnd = (e: any) => {
    setIsDragging(false);
  };
  return (
    <div className="bloc" onMouseDown={dragStart} onMouseMove={dragging} onMouseUp={dragEnd} style={{ position: "absolute", left: coords.left, top: coords.top }}>
      <div className="dragHandle">DRAG ME</div>
      {props.children}
    </div>
  );
}
