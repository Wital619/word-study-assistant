import React, { useRef, Fragment } from 'react';
import Button from '../UI/Button/Button';

import classes from './WordCard.css';

const SELECTION_METHODS = ['input', 'choices'];

const WordCard = props => {
  const wordText = useRef();

  const guessWord = () => {
    const word = wordText.current.value;

    if (word.trim() !== '') {
      props.setGuessingWord(word);
    }
  };

  let htmlMethodElement = (
    <div className={classes.InputSelectionWrapper}>
      <input
        type="text"
        ref={wordText}
        className={classes.WordInput}
        placeholder="Enter a correct word"
      />
      <Button btnType="Primary" clicked={guessWord}>
        Next
      </Button>
    </div>
  );

  if (props.selectionMethod === 'choices') {
    htmlMethodElement = (
      <Fragment>
        <ul className={classes.ChoicesSelectionWrapper}>
          {props.choiceWords.map(word => (
            <li
              key={word}
              onClick={() => props.setGuessingWord(word)}
              className={classes.ChoicesSelectionItem}
            >
              {word}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }

  return (
    <div className={classes.CardWrapper}>
      <ul className={classes.SelectionMethods}>
        {SELECTION_METHODS.map(method => (
          <li
            key={method}
            style={{
              background:
                method === props.selectionMethod ? 'green' : 'transparent'
            }}
            className={classes.SelectionMethod}
            onClick={() => props.setSelectionMethod(method)}
          >
            {method}
          </li>
        ))}
      </ul>
      <div className={classes.WordCard}>
        <h4 className={classes.WordHeader}>
          Translate the word below into English
        </h4>
        <div className={classes.WordWrapper}>
          <p className={classes.Word}>привіт</p>
        </div>
        <div className={classes.SelectionWrapper}>{htmlMethodElement}</div>
        <div className={classes.Controls}>
          <Button btnType="Primary">Skip the word</Button>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
