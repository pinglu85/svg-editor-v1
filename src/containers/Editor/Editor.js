import React, { useState, useRef } from 'react';

import SVG from '../../components/SVG/SVG';
import Interface from '../../components/UI/Interface/Interface';

const Editor = () => {
  const [points, setPoints] = useState([
    { x: 150, y: 281.5 },
    {
      x: 297,
      y: 178,
      c: [
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ]
    },
    {
      x: 453,
      y: 293,
      c: [
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ]
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [pointIndex, setPointIndex] = useState(null);
  const [isCurving, setIsCurving] = useState(false);
  const [isEditingCurve, setIsEditingCurve] = useState(false);
  const [handleIndex, setHandleIndex] = useState({
    anchorPointIndex: 0,
    handlePointIndex: 0
  });

  const ref = useRef(null);

  // Draw path
  const generatePath = () => {
    let d;
    points.forEach((point, i) => {
      if (i === 0) {
        d = `M${point.x} ${point.y}`;
      } else {
        if (point.c[0].x === 0) {
          d += ` L${point.x} ${point.y}`;
        } else {
          d += ` C${point.c[0].x} ${point.c[0].y} ${point.c[1].x} ${point.c[1].y} ${point.x} ${point.y}`;
        }
      }
    });

    return d;
  };

  const mouseDownHandler = e => {
    const mouseX = e.pageX - ref.current.offsetLeft;
    const mouseY = e.pageY - ref.current.offsetTop;
    const newPoints = [...points];
    const handlePoints = newPoints
      .filter(point => Object.prototype.hasOwnProperty.call(point, 'c'))
      .map(point => point.c);
    // Detects which anchor is selected
    // and enable editing the anchor position
    newPoints.forEach((point, i) => {
      const distance = Math.sqrt(
        Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2)
      );
      if (distance <= 9 && !isCurving) {
        setPointIndex(i);
        setIsEditing(true);
      }
    });

    // Detects which handle point is selected
    // and enables editing the handle position
    handlePoints.forEach((point, i) => {
      point.forEach((p, j) => {
        const distance = Math.sqrt(
          Math.pow(mouseX - p.x, 2) + Math.pow(mouseY - p.y, 2)
        );
        if (distance <= 7) {
          setIsEditingCurve(true);
          setHandleIndex({ anchorPointIndex: i + 1, handlePointIndex: j });
        }
      });
    });
  };

  const mouseMoveHandler = e => {
    // Moves anchor with mouse position
    if (isEditing) {
      const mouseX = e.pageX - ref.current.offsetLeft;
      const mouseY = e.pageY - ref.current.offsetTop;
      const newPoints = [...points];
      newPoints[pointIndex].x = mouseX;
      newPoints[pointIndex].y = mouseY;
      setPoints(newPoints);
    }

    // Moves handle with mouse position
    if (isEditingCurve) {
      const mouseX = e.pageX - ref.current.offsetLeft;
      const mouseY = e.pageY - ref.current.offsetTop;
      const newPoints = [...points];
      const { anchorPointIndex, handlePointIndex } = handleIndex;
      newPoints[anchorPointIndex].c[handlePointIndex].x = mouseX;
      newPoints[anchorPointIndex].c[handlePointIndex].y = mouseY;
      setPoints(newPoints);
    }
  };

  const mouseUpHandler = () => {
    if (isEditing) {
      setIsEditing(false);
    }
    if (isEditingCurve) {
      setIsEditingCurve(false);
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
      const newPoints = [...points];
      if (index === 0) {
        setPoints(calcCPoints(newPoints, index + 1));
      } else {
        setPoints(calcCPoints(newPoints, index));
      }
      setIsCurving(false);
    }
  };

  // Calculate handle positions
  function calcCPoints(points, i) {
    const t1 = 0.2;
    const t2 = 0.8;
    points[i].c[0].x = (1 - t1) * points[i - 1].x + t1 * points[i].x;
    points[i].c[0].y = (1 - t1) * points[i - 1].y + t1 * points[i].y;
    points[i].c[1].x = (1 - t2) * points[i - 1].x + t2 * points[i].x;
    points[i].c[1].y = (1 - t2) * points[i - 1].y + t2 * points[i].y;
    return points;
  }

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
