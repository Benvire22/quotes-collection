import React from 'react';
import { Quote } from '../../types';
import QuoteItem from './QuoteItem/QuoteItem';

interface Props {
  quotes: Quote[];
  onRemove: (id: string) => void;
}

const QuotesList: React.FC<Props> = ({quotes, onRemove}) => {
  return (
    <div>
      {quotes.map((quote: Quote) => (
        <QuoteItem key={quote.id} quote={quote} onClick={() => onRemove(quote.id)} />
      ))}
    </div>
  );
};

export default QuotesList;