import { Quote } from '../../../types';
import React from 'react';

interface Props {
  quote: Quote;
  onClick: () => void;
  onChange: () => void;
}

const QuoteItem: React.FC<Props> = ({quote, onClick, onChange}) => {
  return (
    <div className="border rounded p-4 border-primary mb-4">
      <h4 className="text-primary fs-2">{quote.author}</h4>
      <p className="fs-4 text-primary-emphasis border-bottom pb-3 border-primary">{quote.text}</p>
      <button className="btn btn-warning me-3 text-white fs-4 px-4" onClick={onChange}>Edit</button>
      <button className="btn btn-danger fs-4 px-4" onClick={onClick}>Remove quote</button>
    </div>
  );
};

export default QuoteItem;