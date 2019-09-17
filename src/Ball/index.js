import React from 'react';
import styles from './index.module.css';
const Ball = ({ val_x, val_y }) =>
  <div className={styles.Box} style={{ left: val_x, top: val_y }} >
    <div className={styles.Light}></div>
  </div>


export default Ball