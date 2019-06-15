import React from 'react';
import WordItem from './WordItem/WordItem';

import classes from './WordsList.css';

const WordsList = props => {
  return ( 
    <ul className={classes.WordsList}>
      <WordItem />
      <WordItem />
      <WordItem />
    </ul>
  );
}
 
export default WordsList;