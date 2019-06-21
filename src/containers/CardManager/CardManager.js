import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  Fragment
} from 'react';
import WordCard from '../../components/WordCard/WordCard';
import axios from '../../shared/axios-words';
import AuthContext from '../../shared/auth-context';
import wordsReducer, * as actions from './choice-words-reducer';
import {
  getRandomArrayElem,
  getThreeRandomArrayElems,
  localStorageFactory,
  getRandomNumberByRange
} from '../../shared/utility';

const CardManager = props => {
  const [selectionMethod, setSelectionMethod] = useState('choices');
  const [cardWordsState, dispatch] = useReducer(wordsReducer, {});
  const auth = useContext(AuthContext);
  const storage = localStorageFactory();

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

          storage.set('allUserWords', allUserWords);
          storage.set('unchangableWords', allUserWords);
          storage.set('choiceWords', allEngWords, true);

          getOneWordData();
        }
      })
      .catch(err => {
        dispatch({ type: actions.GET_WORD_FAIL, payload: err.message });
      });
  };

  const getOneWordData = () => {
    let foreignWordToGuess = null;
    let correctEngWord = null;
    let choices = [];
    let allUserWords = storage.get('allUserWords', true);

    if (Object.keys(allUserWords).length === 0) {
      allUserWords = storage.copyAndGet(
        'unchangableWords',
        'allUserWords',
        true
      );
    }

    const engWords = Object.keys(allUserWords);
    const choiceWords = storage.get('choiceWords', true);
    correctEngWord = getRandomArrayElem(engWords);
    foreignWordToGuess = allUserWords[correctEngWord].join(', ');

    const engWordsChoices = choiceWords.filter(word => word !== correctEngWord);
    const randomPosition = getRandomNumberByRange(0, 3);
    choices = getThreeRandomArrayElems(engWordsChoices);
    choices.splice(randomPosition, 0, correctEngWord);

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
    const allUserWords = storage.get('allUserWords', true);
    delete allUserWords[word];
    storage.set('allUserWords', allUserWords, true);
  };

  return (
    <Fragment>
      {cardWordsState.error ? (
        <div>{cardWordsState.error}</div>
      ) : (
        <WordCard
          selectionMethod={selectionMethod}
          setSelectionMethod={setSelectionMethod}
          guessWord={guessWordHandler}
          choiceWords={cardWordsState.choices}
          foreignWordToGuess={cardWordsState.foreignWordToGuess}
        />
      )}
    </Fragment>
  );
};

export default CardManager;
