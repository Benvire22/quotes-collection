import { Quote } from '../../../types';
import React from 'react';

interface Props {
  quote: Quote;
  onClick: () => void;
}

const QuoteItem: React.FC<Props> = ({quote, onClick}) => {
  return (
    <div>
      <h4>{quote.author}</h4>
      <p>{quote.text}</p>
      <button onClick={onClick}>Remove quote</button>
    </div>
  );
};

export default QuoteItem;