import { Quote } from '../../../types';
import React from 'react';

interface Props {
  quote: Quote;
  onClick: () => void;
  onChange: () => void;
}

const QuoteItem: React.FC<Props> = ({quote, onClick, onChange}) => {
  return (
    <div>
      <h4>{quote.author}</h4>
      <p>{quote.text}</p>
      <button onClick={onClick}>Remove quote</button>
      <button onClick={onChange}>Edit</button>
    </div>
  );
};

export default QuoteItem;