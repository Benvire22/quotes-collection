import './App.css';
import ToolBar from './components/ToolBar/ToolBar';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Quotes from './containers/Quotes/Quotes';
import QuoteForm from './containers/QuoteForm/QuoteForm';
import { useCallback, useEffect, useState } from 'react';
import { Categories, Quote, QuotesList } from './types';
import axiosApi from './axiosApi';

const App = () => {
  const [quotesData, setQuotesData] = useState<Quote[]>([]);
  const navigate = useNavigate();

  const categories: Categories[] = [
    { title: 'Star Wars', id: 'star-wars' },
    { title: 'Famous people', id: 'famous-people' },
    { title: 'Saying', id: 'saying' },
    { title: 'Humour', id: 'humour' },
    { title: 'Motivational', id: 'motivational' }
  ];

  const apiRequest = useCallback(async (category: string | null = null) => {
    const { data } = await axiosApi.get<QuotesList>(
      '/quotes.json' + (category ? `?orderBy="category"&equalTo="${category}"` : '')
    );

    if (data !== null) {
      const arrayApiQuotes: Quote[] = Object.keys(data).map((key) => {
        return {
          ...data[key],
          id: key
        };
      });

      setQuotesData(arrayApiQuotes);
    }
  }, []);

  useEffect(() => {
    void apiRequest();
  }, [apiRequest]);

  const removeQuote = async (id: string) => {
    await axiosApi.delete(`/quotes/${id}.json`);
    setQuotesData((prevState) => prevState.filter((post) => post.id !== id));
    navigate('/');
  };

  const onEdit = async (id: string) => {
    navigate(`/quotes/${id}/edit`);
  };

  return (
    <>
      <header className="mb-5">
        <ToolBar />
      </header>
      <main className="container-xl">
        <nav>
          <ul>
            <li><Link to="/">All</Link></li>
            {categories.map((category) => (
              <li key={category.id}><Link to={`/quotes/${category.id}`}>{category.title}</Link></li>
            ))}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Quotes editQuote={onEdit} quotes={quotesData} onRemove={removeQuote} />} />
          <Route path="/quotes/:categoryId"
                 element={<Quotes editQuote={onEdit} apiRequest={apiRequest} quotes={quotesData}
                                  onRemove={removeQuote} />} />
          <Route path="/add-quote" element={<QuoteForm request={apiRequest} categories={categories} />} />
          <Route path="/quotes/:id/edit"
                 element={<QuoteForm request={apiRequest} categories={categories} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;