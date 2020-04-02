import React from 'react';
import PropTypes from 'prop-types';

import styles from './Interface.module.css';

const Interface = ({ clicked }) => {
  return (
    <button className={styles.Btn} onClick={clicked}>
      C
    </button>
  );
};

Interface.propTypes = {
  clicked: PropTypes.func
};

export default React.memo(Interface);
