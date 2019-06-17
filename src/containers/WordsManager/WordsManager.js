import React, {
  useContext,
  useReducer,
  useEffect,
  useState,
  Fragment
} from 'react';
import AuthContext from '../../shared/auth-context';
import WordsList from '../../components/WordsList/WordsList';
import UploadBlock from '../../components/UploadBlock/UploadBlock';
import Spinner from '../../components/UI/Spinner/Spinner';
import wordsReducer, * as actions from './words-reducer';
import axios from '../../shared/axios-words';

const WordsManager = () => {
  const [wordsObject, setWordsObject] = useState(null);
  const [wordsState, dispatch] = useReducer(wordsReducer, {});
  const auth = useContext(AuthContext);

  useEffect(() => {
    getAllUserWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addWordsHandler = () => {
    dispatch({ type: actions.ADD_WORDS });

    axios
      .put(`/users.json`, { [auth.userId]: JSON.stringify(wordsObject) })
      .then(() => {
        getAllUserWords();
        dispatch({ type: actions.ADD_WORDS_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: actions.ADD_WORDS_FAIL, payload: err.message });
      });
  };

  const getAllUserWords = () => {
    dispatch({ type: actions.GET_WORDS });

    axios
      .get('/users.json')
      .then(res => {
        let userWords = null;

        if (res.data) {
          Object.keys(res.data).forEach(key => {
            if (key === auth.userId) {
              userWords = JSON.parse(res.data[key]);
            }
          });
        } else {
          userWords = null;
        }

        dispatch({ type: actions.GET_WORDS_SUCCESS, payload: userWords });
      })
      .catch(err => {
        dispatch({ type: actions.GET_WORDS_FAIL, payload: err.message });
      });
  };

  const uploadFileHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    new Promise((resolve, reject) => {
      reader.onload = e => resolve(e.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    }).then(content => {
      const wordsObject = getWordsObject(content);
      setWordsObject(wordsObject);
    });
  };

  const getWordsObject = fileContent => {
    return fileContent.split('\n').reduce((acc, wordsMatch) => {
      const tweakedWordsMatch = wordsMatch.trim().replace(/[;?]/g, '');

      const [englishWord, translationsStr] = tweakedWordsMatch.split(' - ');
      acc[englishWord] = translationsStr.split(',');

      return acc;
    }, {});
  };

  let wordsList = null;

  if (wordsState.loading) {
    wordsList = <Spinner />;
  } else if (wordsState.words) {
    const englishWordsArray = Object.keys(wordsState.words);

    wordsList = <WordsList words={englishWordsArray} />;
  } else if (!wordsList) {
    wordsList = (
      <div
        style={{
          textAlign: 'center',
          width: '100%',
          marginTop: '50px',
          fontWeight: 'bold',
          color: 'green'
        }}
      >
        You haven't uploaded any files with words!
      </div>
    );
  }

  const error = wordsState.error ? wordsState.error : null;

  return (
    <Fragment>
      <UploadBlock
        uploadFile={uploadFileHandler}
        addWords={addWordsHandler}
        wordsLength={wordsObject ? Object.keys(wordsObject).length : 0}
        showUploadResult={Boolean(wordsObject)}
      />
      <hr />
      {wordsList}
      {error}
    </Fragment>
  );
};

export default WordsManager;
