import React from 'react';
import styles from './App.module.css';
import Editor from './containers/Editor/Editor';

function App() {
  return (
    <div className={styles.App}>
      <Editor />
    </div>
  );
}

export default App;
