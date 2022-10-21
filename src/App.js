import { React, useState, useEffect } from 'react'
import Header from './Components/Header/Header';
import { cardImages } from './Components/Images/Images';
import './App.css';
import Grid from './Components/Grid/Grid';

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [winner, setWinner] = useState(null);
  const [exceeds, setExceeds] = useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setExceeds(false);
    setWinner(false);
    setDisabled(false);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        backToDefault();
      } else {
        setTimeout(() => backToDefault(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  const backToDefault = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns((prevTurns) => prevTurns + 1);
  }

  useEffect(() => {
    setTimeout(() => {
      const isTrue = cards.every((card) => card.matched === true);
      if (turns >= 15) {
        if (isTrue && turns === 15) {
          setWinner(true)
        }
        else {
          setExceeds(true)
          setDisabled(true);
        }
      }
      else if (isTrue && cards.length > 0) {
        setWinner(true)
      }
    }, 500);
  }, [turns, cards, winner]);


  return (
    <div className="App">
      <Header turns={turns} onShuffle={shuffleCards} />
      {
        winner ? <div className='result'>Congratulations, You Win!!</div> : <div></div>
      }
      {
        exceeds ? <div className='result'>Uh Oh, You are out of Turns!!</div> : <div></div>
      }
      <Grid cards={cards} choiceOne={choiceOne} choiceTwo={choiceTwo} disabled={disabled} handleChoice={handleChoice} />
    </div>
  )
}

export default App;