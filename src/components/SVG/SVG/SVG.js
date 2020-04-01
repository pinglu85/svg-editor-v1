import React from 'react';
import PropTypes from 'prop-types';

import Anchor from '../../UI/Anchor/Anchor';

const SVG = ({ d, anchorPos }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500">
      <path
        fill="none"
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="4"
        d={d}
      ></path>
      {anchorPos.map((pos, index) => (
        <Anchor key={index} x={pos.x} y={pos.y} />
      ))}
    </svg>
  );
};

SVG.propTypes = {
  d: PropTypes.string,
  anchorPos: PropTypes.array
};

export default SVG;
