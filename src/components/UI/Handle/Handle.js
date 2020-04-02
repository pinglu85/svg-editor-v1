import React from 'react';
import PropTypes from 'prop-types';

const Handle = ({ handlePos }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500">
      <circle
        cx={handlePos.x}
        cy={handlePos.y}
        r="5"
        fill="#fff"
        stroke="#6c7489"
        strokeMiterlimit="10"
      ></circle>
      <line
        x1={handlePos.x1}
        y1={handlePos.y1}
        x2={handlePos.x}
        y2={handlePos.y}
        stroke="#6c7489"
        strokeWidth="2"
        strokeDasharray="1"
      />
    </svg>
  );
};

Handle.propTypes = {
  handlePos: PropTypes.object
};

export default Handle;
