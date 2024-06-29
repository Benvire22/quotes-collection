import "./App.css";
import ToolBar from './components/ToolBar/ToolBar';
import { Route, Routes } from 'react-router-dom';
import Quotes from './containers/Quotes/Quotes';
import QuoteForm from './containers/QuoteForm/QuoteForm';

const App = () => {
  return (
    <>
      <header className="mb-5">
        <ToolBar />
      </header>
      <main className="container-xl">
        <Routes>
          <Route path="/" element={<Quotes />} />
          <Route path='add-quote' element={<QuoteForm />} />
        </Routes>
      </main>
    </>
  );
};

export default App;