import { Quote } from '../../types';
import React, { useEffect } from 'react';
import QuotesList from '../../components/QuotesList/QuotesList';
import { useParams } from 'react-router-dom';

interface Props {
  quotes: Quote[];
  onRemove: (id: string) => void;
  apiRequest?: (category: string) => Promise<void>;
  editQuote: (id: string) => void;
}

const Quotes: React.FC<Props> = ({quotes, onRemove, apiRequest, editQuote}) => {
  const params = useParams();

  console.log(params.categoryId);

  useEffect(() => {
    if (apiRequest && params.categoryId) {
      void apiRequest(params.categoryId);
    }

  }, [params.categoryId]);
  return (
    <div>
      <QuotesList editQuote={editQuote} quotes={quotes} onRemove={onRemove} />
    </div>
  );
};

export default Quotes;