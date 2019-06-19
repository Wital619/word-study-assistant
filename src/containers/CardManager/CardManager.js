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
        const allUserWords = res.data[auth.userId];

        if (allUserWords) {
          const parsedWords = JSON.parse(allUserWords);
          const allEngWords = Object.keys(parsedWords);

          localStorage.setItem('allUserWords', allUserWords);
          localStorage.setItem('choiceWords', allEngWords);

          getOneWordData();
        }
      })
      .catch(err => {
        dispatch({ type: actions.GET_WORD_FAIL, payload: err.message });
      });
  };

  const getOneWordData = () => {
    // TODO: Create one more list of allUserWords that should be unchangable 
    let foreignWordToGuess = null;
    let correctEngWord = null;
    let choices = [];
    const allUserWords = JSON.parse(localStorage.getItem('allUserWords'));
    const engWords = Object.keys(allUserWords);
    const choiceWords = localStorage.getItem('choiceWords').split(',');
    correctEngWord = getRandomIndex(engWords);
    foreignWordToGuess = allUserWords[correctEngWord].join(', ');

    const engWordsChoices = choiceWords.filter(word => word !== correctEngWord);
    choices = getThreeRandomIndexes(engWordsChoices);
    choices.push(correctEngWord);

    dispatch({
      type: actions.GET_WORD_SUCCESS,
      payload: { foreignWordToGuess, correctEngWord, choices }
    });
  };

  const guessWordHandler = word => {
    if (word === cardWordsState.correctEngWord) {
      excludeEnglishWord(word);

      setTimeout(() => {
        getOneWordData();
      }, 100);

      return true;
    }

    return false;
  };

  const excludeEnglishWord = word => {
    const allUserWords = JSON.parse(localStorage.getItem('allUserWords'));
    delete allUserWords[word];
    localStorage.setItem('allUserWords', JSON.stringify(allUserWords));
  };

  return (
    <WordCard
      selectionMethod={selectionMethod}
      setSelectionMethod={setSelectionMethod}
      guessWord={guessWordHandler}
      choiceWords={cardWordsState.choices}
      foreignWordToGuess={cardWordsState.foreignWordToGuess}
    />
  );
};

export default CardManager;
