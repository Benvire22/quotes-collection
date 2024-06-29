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
    <div className="border rounded p-4">
      { quotes.length > 0 ? quotes.map((quote: Quote) => (
        <QuoteItem key={quote.id} onChange={() => {editQuote(quote.id, quote)}} quote={quote} onClick={() => onRemove(quote.id)} />
      )) : <h4 className="text-secondary-emphasis text-center fs-1">Empty..</h4>}
    </div>
  );
};

export default QuotesList;