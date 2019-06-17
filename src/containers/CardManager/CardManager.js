import React, { useState, useEffect, useContext, useReducer } from 'react';
import WordCard from '../../components/WordCard/WordCard';
import axios from '../../shared/axios-words';
import AuthContext from '../../shared/auth-context';
import wordsReducer, * as actions from './choice-words-reducer';
import { getRandomIndex, getThreeRandomIndexes } from '../../shared/utility';

const CardManager = props => {
  const [selectionMethod, setSelectionMethod] = useState('choices');
  const [cardWordsState, dispatch] = useReducer(wordsReducer, {});
  const auth = useContext(AuthContext);

  useEffect(() => {
    getWordToGuess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWordToGuess = () => {
    dispatch({ type: actions.GET_WORD });

    axios
      .get('/users.json')
      .then(res => {
        const userWords = res.data[auth.userId];

        if (userWords) {
          const [wordToGuess, correctEngWord, choices] = getCardWords(
            userWords
          );

          dispatch({
            type: actions.GET_WORD_SUCCESS,
            payload: {
              wordToGuess,
              correctEngWord,
              choices
            }
          });
        }
      })
      .catch(err => {
        dispatch({ type: actions.GET_WORD_FAIL, payload: err.message });
      });
  };

  const getCardWords = userWords => {
    let foreignWordToGuess = null;
    let correctEngWord = null;
    let choices = [];

    if (userWords) {
      const words = JSON.parse(userWords);
      const engWords = Object.keys(words);
      correctEngWord = getRandomIndex(engWords);
      foreignWordToGuess = words[correctEngWord][0];

      const engWordsChoices = engWords.filter(word => word !== correctEngWord);
      choices = getThreeRandomIndexes(engWordsChoices);
      choices.push(correctEngWord);
      // TODO: додати в кук послідовність
    }

    return [foreignWordToGuess, correctEngWord, choices];
  };

  const guessWordHandler = word => {
    console.log(word === cardWordsState.correctEngWord);
  };

  return (
    <WordCard
      selectionMethod={selectionMethod}
      setSelectionMethod={setSelectionMethod}
      guessWord={guessWordHandler}
      choiceWords={cardWordsState.choices}
      wordToGuess={cardWordsState.wordToGuess}
    />
  );
};

export default CardManager;
