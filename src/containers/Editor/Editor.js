import React, { useState, useRef } from 'react';

import SVG from '../../components/SVG/SVG/SVG';
import Interface from '../../components/UI/Interface/Interface';

const Editor = () => {
  const [points, setPoints] = useState([
    { x: 150, y: 281.5 },
    { x: 297, y: 178, c: { x1: 0, y1: 0, x2: 0, y2: 0 } },
    { x: 453, y: 293, c: { x1: 0, y1: 0, x2: 0, y2: 0 } }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [pointIndex, setPointIndex] = useState(null);
  const [isCurving, setIsCurving] = useState(false);

  const ref = useRef(null);

  // Draw path
  const generatePath = () => {
    let d;
    points.forEach((point, i) => {
      if (i === 0) {
        d = `M${point.x} ${point.y}`;
      }
      if (i === 1) {
        if (point.c.x1 === 0) {
          d += ` L${point.x} ${point.y}`;
        } else {
          d += ` C${point.c.x1} ${point.c.y1} ${point.c.x2} ${point.c.y2} ${point.x} ${point.y}`;
        }
      }
      if (i === 2) {
        if (point.c.x1 === 0) {
          d += ` L${point.x} ${point.y}`;
        } else {
          d += ` C${point.c.x1} ${point.c.y1} ${point.c.x2} ${point.c.y2} ${point.x} ${point.y}`;
        }
      }
    });

    return d;
  };

  const mouseDownHandler = e => {
    const mouseX = e.pageX - ref.current.offsetLeft;
    const mouseY = e.pageY - ref.current.offsetTop;
    const newPoints = [...points];
    newPoints.forEach((point, i) => {
      const distance = Math.sqrt(
        Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2)
      );
      if (distance <= 9 && !isCurving) {
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
      newPoints[pointIndex].x = mouseX;
      newPoints[pointIndex].y = mouseY;
      setPoints(newPoints);
    }
  };

  const mouseUpHandler = () => {
    if (isEditing) {
      setIsEditing(false);
    }
  };

  // Curve mode
  const curvingClickHandler = () => {
    setIsCurving(true);
  };

  // Change point draw command & set the positions of handles
  const changeDrawMode = e => {
    if (isCurving) {
      const index = Number(e.target.id);
      if (index === 1 || index === 2) {
        const newPoints = calcCPoints([...points], index);
        setPoints(newPoints);
        setIsCurving(false);
      }
    }
  };

  const handleSelected = e => {
    const mouseX = e.pageX - ref.current.offsetLeft;
    const mouseY = e.pageY - ref.current.offsetTop;
    const newPoints = [...points];
  };

  // Calculate handle positions
  const calcCPoints = (points, i) => {
    const t1 = 0.2;
    const t2 = 0.8;
    points[i].c.x1 = (1 - t1) * points[i - 1].x + t1 * points[i].x;
    points[i].c.y1 = (1 - t1) * points[i - 1].y + t1 * points[i].y;
    points[i].c.x2 = (1 - t2) * points[i - 1].x + t2 * points[i].x;
    points[i].c.y2 = (1 - t2) * points[i - 1].y + t2 * points[i].y;
    return points;
  };

  return (
    <div
      ref={ref}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
      style={{ position: 'relative' }}
    >
      <Interface clicked={curvingClickHandler} />
      <SVG d={generatePath()} pointsPos={points} clicked={changeDrawMode} />
    </div>
  );
};

export default Editor;
