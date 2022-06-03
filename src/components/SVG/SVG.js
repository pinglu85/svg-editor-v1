import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Anchor from '../UI/Anchor/Anchor';
import Handle from '../UI/Handle/Handle';

const SVG = ({ d, pointsPos, clicked }) => {
  const handle = pointsPos.map((pos, index) => {
    if (!pos.c || pos.c[0].x === 0) return null;

    return (
      <Fragment key={index}>
        <Handle
          handlePos={{
            x: pointsPos[index].c[0].x,
            y: pointsPos[index].c[0].y,
            x1: pointsPos[index - 1].x,
            y1: pointsPos[index - 1].y,
          }}
        />
        <Handle
          handlePos={{
            x: pointsPos[index].c[1].x,
            y: pointsPos[index].c[1].y,
            x1: pointsPos[index].x,
            y1: pointsPos[index].y,
          }}
        />
      </Fragment>
    );
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500">
      <path
        fill="none"
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="4"
        d={d}
      ></path>
      {pointsPos.map((pos, index) => (
        <Anchor key={index} x={pos.x} y={pos.y} id={index} clicked={clicked} />
      ))}
      {handle}
    </svg>
  );
};

SVG.propTypes = {
  d: PropTypes.string,
  pointsPos: PropTypes.array,
  clicked: PropTypes.func,
};

export default SVG;
