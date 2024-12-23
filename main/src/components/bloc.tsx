import React, { useState } from "react";

type BlocProps = {
  children: JSX.Element[]
}

type Coordinates = {
  left: number,
  top: number
}

export default function Bloc(props: BlocProps) {
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const [zIndex, setZIndex] = useState(5);
  const [prevZ, setPrevZ] = useState(5);
  const [isDragging, setIsDragging] = useState(false);
  const [coords, setCoords] = useState<Coordinates>({left: 0, top: 0});
  //Click on wrapped object, save original position
  //Save diff for dragend.
  const dragStart = (e: any) => {
    const currentLeft = e.currentTarget.parentElement.getBoundingClientRect().left - 
                        e.currentTarget.parentElement.parentElement.getBoundingClientRect().left;
    const currentTop = e.currentTarget.parentElement.getBoundingClientRect().top - 
                        e.currentTarget.parentElement.parentElement.getBoundingClientRect().top;
    setDiffX(e.screenX - currentLeft);
    setDiffY(e.screenY - currentTop);
    setPrevZ(zIndex);
    setZIndex(50);
    setIsDragging(true);
  };
  //Rerender and position wrapped, dragged object while dragging on cursor
  const dragging = (e: any) => {
    if (isDragging) {
      var left = e.screenX - diffX;
      var top = e.screenY - diffY;
      setCoords({
        left: left,
        top: top
      })
    }
  };
  //Drop object to nearest anchor point
  const dragEnd = (e: any) => {
    setZIndex(prevZ);
    setIsDragging(false);
    document.removeEventListener('mousemove', dragging);
    document.removeEventListener('mouseup', dragEnd);
  };

  document.addEventListener('mousemove', dragging);
  document.addEventListener('mouseup', dragEnd);
  
  

  return (
    <div className="bloc" style={{ position: "absolute", zIndex: zIndex, left: coords.left, top: coords.top }}>
      <div className="dragHandle" onMouseDown={dragStart} >DRAG ME</div>
        {props.children}
    </div>
  );
}
