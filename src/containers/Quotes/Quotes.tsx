import { Quote } from '../../types';
import React from 'react';
import QuotesList from '../../components/QuotesList/QuotesList';

interface Props {
  quotes: Quote[];
  onRemove: (id: string) => void;
}

const Quotes: React.FC<Props> = ({quotes, onRemove}) => {
  return (
    <div>
      <QuotesList quotes={quotes} onRemove={onRemove} />
    </div>
  );
};

export default Quotes;