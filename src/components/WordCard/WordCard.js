import React, { useRef } from 'react';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

import classes from './WordCard.css';

const SELECTION_METHODS = ['input', 'choices'];

const WordCard = props => {
  const wordText = useRef();
  const highlightElement = useRef();

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
    if (isCorrect) {
      highlightElement.current.style.background = 'green';
    } else {
      highlightElement.current.style.background = 'red';
    }

    setTimeout(() => {
      highlightElement.current.style.background = '#fff';
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
    htmlMethodElement =
      props.choiceWords && props.choiceWords.length ? (
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
      ) : (
        <Spinner marginTop="22px" />
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
        <div className={classes.WordWrapper} ref={highlightElement}>
          {props.foreignWordToGuess ? (
            <p className={classes.Word}>{props.foreignWordToGuess}</p>
          ) : (
            <Spinner marginTop="50px" />
          )}
        </div>
        <div className={classes.SelectionWrapper}>{htmlMethodElement}</div>
      </div>
    </div>
  );
};

export default WordCard;
