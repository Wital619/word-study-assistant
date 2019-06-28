import React, { Fragment } from 'react';
import Button from '../UI/Button/Button';
import FileInput from '../FileInput/FileInput';

import classes from './UploadBlock.css';

const UploadBlock = ({
  wordsLength,
  addWords,
  showUploadResult,
  uploadFile
}) => {
  let uploadResult = null;

  if (showUploadResult) {
    const instruction =
      wordsLength > 3 ? (
        <Fragment>
          <p>Click the button below to add them to your learning list</p>
          <Button btnType="Primary" clicked={addWords}>
            Add New Words
          </Button>
        </Fragment>
      ) : (
        <p>This is too small to load. Please upload at least 4 words.</p>
      );

    uploadResult = (
      <div className={classes.UploadFilesInfo}>
        <p>You have uploaded {wordsLength} word(s)!</p>
        {instruction}
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.FileInputWrapper}>
        <FileInput onChangedHandler={uploadFile} />
      </div>
      {uploadResult}
    </Fragment>
  );
};

export default UploadBlock;
