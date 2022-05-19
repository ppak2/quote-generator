import { useState, useEffect } from "react";
import "./QuoteModal.css";
import { Loader } from "../loader/Loader";

const URL = `https://type.fit/api/quotes`;
const getQoute = arr => arr[Math.floor(Math.random() * arr.length)];

export const QuoteModal = () => {

  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          const datavalue = data;
          setQuotes(datavalue);
          setCurrentQuote(datavalue[0]);
          setIsLoading(false);
          console.log('LOADING');
        })
        .catch((error) => alert(error));
    })();
    console.log('EFFECT')
  }, []);

  const getQuoteHandler = () => setCurrentQuote(getQoute(quotes));
  if (isLoading) return <Loader />

  return (
    <div className="quote-container" id="quote-container">
      {console.log('RENDER')}
      <div className="quote-text">
        <i className="fas fa-quote-left"></i>
        <span id="quote-container">{currentQuote.text}</span>
      </div>
      <div className="quote-author">
        <span id="author">{currentQuote.author}</span>
      </div>
      <div className="button-container">
        <button className="twitter-button" id="twitter" title="Tweet This!">
          <i className="fab fa-twitter"></i>
        </button>
        <button id="new-quote" onClick={getQuoteHandler}>New Quote</button>
      </div>
    </div>
  );
};
