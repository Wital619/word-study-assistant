import React, { useContext, useState } from 'react';
import AuthContext from '../../shared/auth-context';
import UploadBlock from '../../components/UploadBlock/UploadBlock';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../shared/axios-words';

import classes from './WordsManager.css';

const WordsManager = () => {
  const [wordsObject, setWordsObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  const addWordsHandler = () => {
    setLoading(true);

    axios
      .put(`/users.json`, { [auth.userId]: JSON.stringify(wordsObject) })
      .then(() => {
        setLoading(false);
      });
  };

  const uploadFileHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    new Promise((resolve, reject) => {
      reader.onload = e => resolve(e.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file, 'cp1251');
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

  let content = (
    <div className={classes.WordsWrapper}>
      <UploadBlock
        uploadFile={uploadFileHandler}
        addWords={addWordsHandler}
        wordsLength={wordsObject ? Object.keys(wordsObject).length : 0}
        showUploadResult={Boolean(wordsObject)}
      />
    </div>
  );

  if (loading) {
    content = <Spinner />;
  }

  return content;
};

export default WordsManager;
