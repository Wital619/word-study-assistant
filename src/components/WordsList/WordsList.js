import React from 'react';
import WordItem from '../WordItem/WordItem';

import classes from './WordsList.css';

const WordsList = props => (
  <ul className={classes.WordsList}>
    {props.words.map(word => (
      <WordItem key={word}>{word}</WordItem>
    ))}
  </ul>
);

export default WordsList;
