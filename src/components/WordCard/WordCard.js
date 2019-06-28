import React, { useRef, useEffect } from 'react';
import Button from '../UI/Button/Button';
import Tabs from '../UI/Tabs/Tabs';

import classes from './WordCard.css';

const SELECTION_METHODS = ['input', 'choices'];

const WordCard = props => {
  const wordText = useRef();
  const highlightElement = useRef();

  useEffect(() => {
    if (props.selectionMethod === 'input') {
      wordText.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectionMethod, props.foreignWordToGuess]);

  const guessWordByInput = () => {
    const word = wordText.current.value.trim();

    if (word !== '') {
      const isCorrect = props.guessWord(word);
      wordText.current.value = '';

      checkCorrectness(isCorrect);
    }
  };

  const guessWordByChoice = word => {
    const isCorrect = props.guessWord(word);

    checkCorrectness(isCorrect);
  };

  const checkCorrectness = isCorrect => {
    const element = highlightElement.current;

    if (isCorrect) {
      element.style.background = 'green';
    } else {
      element.style.background = 'red';
    }

    setTimeout(() => {
      element.style.background = '#fff';
    }, 100);
  };

  let htmlMethodElement = (
    <div className={classes.InputSelectionWrapper}>
      <input
        type="text"
        ref={wordText}
        className={classes.WordInput}
        placeholder="Enter a correct word"
      />
      <Button btnType="Primary" clicked={guessWordByInput}>
        Next
      </Button>
    </div>
  );

  if (props.selectionMethod === 'choices') {
    htmlMethodElement = (
      <ul className={classes.ChoicesSelectionWrapper}>
        {props.choiceWords.map(word => (
          <li
            key={word}
            onClick={() => guessWordByChoice(word)}
            className={classes.ChoicesSelectionItem}
          >
            {word}
          </li>
        ))}
      </ul>
    );
  }

  return props.choiceWords.length ? (
    <div className={classes.CardWrapper}>
      <Tabs
        tabs={SELECTION_METHODS}
        onChangeTab={props.setSelectionMethod}
        activeTab={props.selectionMethod}
      />
      <div className={classes.WordCard}>
        <h4 className={classes.WordHeader}>
          Translate the word below into English
        </h4>
        <div className={classes.WordWrapper} ref={highlightElement}>
          <p className={classes.Word}>{props.foreignWordToGuess}</p>
        </div>
        <div className={classes.SelectionWrapper}>{htmlMethodElement}</div>
      </div>
    </div>
  ) : null;
};

export default WordCard;
