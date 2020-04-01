import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Anchor = ({ x, y }) => {
  const [fill, setFill] = useState('#fff');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 500"
      draggable="true"
      onMouseEnter={() => setFill('#96a0ff')}
      onMouseLeave={() => setFill('#fff')}
    >
      <circle
        cx={x}
        cy={y}
        r="9"
        fill={fill}
        stroke="#000"
        strokeMiterlimit="10"
      ></circle>
    </svg>
  );
};

Anchor.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number
};

export default Anchor;
