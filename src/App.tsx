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
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humour', id: 'humour'},
    {title: 'Motivational', id: 'motivational'},
  ];

  const apiRequest = useCallback(async () => {
    const { data } = await axiosApi.get<QuotesList>('/quotes.json');
    console.log(data);

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
      await axiosApi.delete(`/posts/${id}.json`);
      setQuotesData((prevState) => prevState.filter((post) => post.id !== id));
      navigate('/');
  };

  return (
    <>
      <header className="mb-5">
        <ToolBar />
      </header>
      <main className="container-xl">
        <nav>
          <ul>
            {categories.map((category) => (
              <li key={category.id}><Link to={`/${category.id}`}>{category.title}</Link> </li>
            ))}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Quotes quotes={quotesData} onRemove={removeQuote} />} />
          <Route path="/add-quote" element={<QuoteForm request={apiRequest} categories={categories} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;