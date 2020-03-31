import React, { useState, useRef } from 'react';

import SVG from '../../components/SVG/SVG/SVG';

const Editor = () => {
  const [points, setPoints] = useState([
    { x: 150, y: 281.5 },
    { x: 297, y: 178 },
    { x: 453, y: 293 }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [pointIndex, setPointIndex] = useState(null);

  const ref = useRef(null);

  const generatePath = () => {
    let d;
    points.forEach((point, i) => {
      if (i === 0) {
        d = `M${point.x} ${point.y}`;
      } else if (i === 1) {
        d += ` L${point.x} ${point.y}`;
      } else {
        d += ` ${point.x} ${point.y}`;
      }
    });

    return d;
  };

  const mouseDownHandler = e => {
    console.log('mousedown');
    const mouseX = e.pageX - ref.current.offsetLeft;
    const mouseY = e.pageY - ref.current.offsetTop;
    const newPoints = [...points];
    newPoints.forEach((point, i) => {
      const distance = Math.sqrt(
        Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2)
      );
      console.log(distance);
      if (distance <= 9) {
        setPointIndex(i);
        setIsEditing(true);
      }
    });
  };

  const mouseMoveHandler = e => {
    if (isEditing) {
      const mouseX = e.pageX - ref.current.offsetLeft;
      const mouseY = e.pageY - ref.current.offsetTop;
      const newPoints = [...points];
      newPoints[pointIndex] = { x: mouseX, y: mouseY };
      setPoints(newPoints);
    }
  };

  const mouseUpHandler = () => {
    if (isEditing) {
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={ref}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
    >
      <SVG d={generatePath()} anchorPos={points} />
    </div>
  );
};

export default Editor;
