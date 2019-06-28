import React, { useState, useEffect, useContext } from 'react';
import WordCard from '../../components/WordCard/WordCard';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../shared/axios-words';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import AuthContext from '../../shared/auth-context';
import {
  getRandomArrayElem,
  getThreeRandomArrayElems,
  localStorageFactory,
  getRandomNumberByRange
} from '../../shared/utility';

const initialWordsState = {
  foreignWordToGuess: null,
  correctEngWord: null,
  choices: []
};

const CardManager = props => {
  const [selectionMethod, setSelectionMethod] = useState('choices');
  const [wordsState, setWordsState] = useState(initialWordsState);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const storage = localStorageFactory();

  useEffect(() => {
    console.log('fetch');
    fetchWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWords = () => {
    setLoading(true);

    axios
      .get('/users.json')
      .then(res => {
        const allUserWords = res.data[auth.userId];

        if (allUserWords) {
          const parsedWords = JSON.parse(allUserWords);
          const allEngWords = Object.keys(parsedWords);

          storage.set('allUserWords', allUserWords);
          storage.set('choiceWords', allEngWords, true);

          getOneWordData();
        } else {
          setWordsState(initialWordsState);
        }

        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const getOneWordData = () => {
    let foreignWordToGuess = null;
    let correctEngWord = null;
    let choices = [];
    let allUserWords = storage.get('allUserWords', true);

    const engWords = Object.keys(allUserWords);
    const choiceWords = storage.get('choiceWords', true);
    correctEngWord = getRandomArrayElem(engWords);
    foreignWordToGuess = allUserWords[correctEngWord].join(', ');

    const engWordsChoices = choiceWords.filter(word => word !== correctEngWord);
    const randomPosition = getRandomNumberByRange(0, 3);
    choices = getThreeRandomArrayElems(engWordsChoices);
    choices.splice(randomPosition, 0, correctEngWord);

    setWordsState({ foreignWordToGuess, correctEngWord, choices });
  };

  const guessWordHandler = word => {
    if (word === wordsState.correctEngWord) {
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

    if (Object.keys(allUserWords).length === 0) {
      fetchWords();
    } else {
      storage.set('allUserWords', allUserWords, true);
    }
  };

  let content = <Spinner />;

  if (!loading) {
    content = (
      <WordCard
        selectionMethod={selectionMethod}
        setSelectionMethod={setSelectionMethod}
        guessWord={guessWordHandler}
        choiceWords={wordsState.choices}
        foreignWordToGuess={wordsState.foreignWordToGuess}
      />
    );
  }

  return props.isError ? null : content;
};

export default withErrorHandler(CardManager, axios);
