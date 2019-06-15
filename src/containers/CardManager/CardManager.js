import React, { useState, useEffect } from 'react';
import WordCard from '../../components/WordCard/WordCard';

const CardManager = props => {
  const [selectionMethod, setSelectionMethod] = useState('choices');
  const [guessingWord, setGuessingWord] = useState('');
  const [choiceWords, setChoiceWords] = useState([]);

  return (
    <WordCard
      selectionMethod={selectionMethod}
      setSelectionMethod={setSelectionMethod}
      guessingWord={guessingWord}
      setGuessingWord={setGuessingWord}
      choiceWords={['hello', 'my name is Vitaliy', 'absence', 'attentively']}
    />
  );
};

export default CardManager;
