import React, { useContext, useReducer } from 'react';
import AuthContext from '../../shared/auth-context';
import WordItem from './WordItem/WordItem';
import { wordsReducer, GET_WORDS, PUSH_WORDS } from './words-reducer'; 

import classes from './WordsManager.css';

const WordsManager = props => {
  const auth = useContext(AuthContext);
  const [wordsState, dispatch] = useReducer(wordsReducer);

  return (
    <ul className={classes.WordsManager}>
      <WordItem />
      <WordItem />
      <WordItem />
    </ ul>
  );
};

export default WordsManager;
