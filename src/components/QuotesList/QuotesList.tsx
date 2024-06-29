import React from 'react';
import { Quote } from '../../types';
import QuoteItem from './QuoteItem/QuoteItem';

interface Props {
  quotes: Quote[];
  onRemove: (id: string) => void;
  editQuote: (id: string, quote: Quote) => void;
}

const QuotesList: React.FC<Props> = ({quotes, onRemove, editQuote}) => {
  return (
    <div>
      {quotes.map((quote: Quote) => (
        <QuoteItem key={quote.id} onChange={() => {editQuote(quote.id, quote)}} quote={quote} onClick={() => onRemove(quote.id)} />
      ))}
    </div>
  );
};

export default QuotesList;