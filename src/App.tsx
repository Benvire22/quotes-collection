import { useCallback, useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import axiosApi from './axiosApi';
import { Categories, Quote, QuotesList } from './types';
import QuoteForm from './containers/QuoteForm/QuoteForm';
import ToolBar from './components/ToolBar/ToolBar';
import Quotes from './containers/Quotes/Quotes';
import NotFound from './containers/NotFound/NotFound';
import handleError from './lib/handleError';
import Spinner from './components/Spinner/Spinner';
import Error from './components/Error/Error';
import './App.css';

const categories: Categories[] = [
  { title: 'Star Wars', id: 'star-wars' },
  { title: 'Famous people', id: 'famous-people' },
  { title: 'Saying', id: 'saying' },
  { title: 'Humour', id: 'humour' },
  { title: 'Motivational', id: 'motivational' }
];

const App = () => {
  const [quotesData, setQuotesData] = useState<Quote[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const apiRequest = useCallback(async (category: string | null = null) => {
    try {
      setIsLoading(true);
      const { data } = await axiosApi.get<QuotesList>(
        '/quotes.json' + (category ? `?orderBy="category"&equalTo="${category}"` : '')
      );

      if (data !== null) {
        const arrayApiQuotes: Quote[] = Object.keys(data).map((key) => {
          return {
            ...data[key],
            id: key,
          };
        });

        setQuotesData(arrayApiQuotes);
      } else {
        setQuotesData([]);
      }
    } catch (e) {
      handleError(e as Error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void apiRequest();
  }, [apiRequest]);

  const removeQuote = async (id: string) => {
    try {
      setIsLoading(true);
      await axiosApi.delete(`/quotes/${id}.json`);
      void apiRequest();
    } catch (e) {
      handleError(e as Error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onEdit = async (id: string) => {
    navigate(`/quotes/${id}/edit`);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <header className="mb-5">
        <ToolBar />
      </header>
      <main className="container-xl">
        <div className="row">
          <aside className="col-3">
            <ul className="list-group border p-3">
              <li>
                <Link
                  to="/"
                  onClick={() => void apiRequest()}
                  className="list-group-item fs-4 btn btn-primary"
                >All</Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/quotes/${category.id}`}
                    className="list-group-item fs-4 btn btn-primary"
                  >{category.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
          <div className="col-8">
            {isError && <Error />}
            <Routes>
              <Route
                path="/"
                element={<Quotes
                  editQuote={onEdit}
                  quotes={quotesData}
                  onRemove={removeQuote}
                />}
              />
              <Route
                path="/quotes/:categoryId"
                element={
                  <Quotes
                    editQuote={onEdit}
                    apiRequest={apiRequest}
                    quotes={quotesData}
                    onRemove={removeQuote}
                  />}
              />
              <Route
                path="/add-quote"
                element={
                  <QuoteForm
                    request={apiRequest}
                    categories={categories}
                  />}
              />
              <Route
                path="/quotes/:id/edit"
                element={
                  <QuoteForm
                    request={apiRequest}
                    categories={categories}
                  />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;