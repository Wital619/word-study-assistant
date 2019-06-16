import React, { Fragment } from 'react';
import Button from '../UI/Button/Button';
import FileInput from '../FileInput/FileInput';

import classes from './UploadBlock.css';

const UploadBlock = props => {
  let uploadResult = null;

  if (props.showUploadResult) {
    uploadResult = (
      <div className={classes.UploadFilesInfo}>
        <p>You've uploaded {props.wordsLength} word(s)!</p>
        <p>Click the button below to add them to your learning list</p>
        <Button btnType="Primary" clicked={props.addWords}>
          Add New Words
        </Button>
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.FileInputWrapper}>
        <FileInput onChangedHandler={props.uploadFile} />
      </div>
      {uploadResult}
    </Fragment>
  );
};

export default UploadBlock;
