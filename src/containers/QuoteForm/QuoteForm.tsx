import React, { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Categories, QuoteApi } from '../../types';

interface QuoteForm {
  category: string;
  author: string;
  text: string;
}

interface Props {
  request: () => Promise<void>;
  categories: Categories[];
}

const QuoteForm: React.FC<Props> = ({ request, categories }) => {
  const [formData, setFormData] = useState<QuoteForm>({
    category: 'star-wars',
    author: '',
    text: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  if (id !== undefined) {
    const request = useCallback(async () => {
      const { data } = await axiosApi.get<QuoteApi>(`/quotes/${id}.json`);

      console.log(data);

      setFormData({
        category: data.category,
        author: data.author,
        text: data.text
      });
    }, []);

    useEffect(() => {
      void request();
    }, [request]);
  }

  const changeQuote = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await axiosApi.put(`/quotes/${id}.json`, formData);
    } else {
      await axiosApi.post('/quotes.json', formData);
    }

    setFormData({
      category: 'humor',
      author: '',
      text: ''
    });

    await request();
    navigate('/');
  };

  return (
    <>
      <div className="row px-5 fs-5">
        <h3 className="text-warning text-center fs-1 mb-5">Add Quote</h3>
        <div className="row mt-2 justify-content-center">
          <div className="col-10 text-primary-emphasis">
            <form onSubmit={onFormSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="category" className="fs-4 mb-2">Select Category</label>
                <select className="form-select form-control border-primary fs-5 mb-3 py-2" name="category"
                        value={formData.category} id="category"
                        aria-label="Default select categories"
                        onChange={changeQuote}>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="author" className="fs-4 mb-2">Author</label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  className="form-control border-primary fs-5 mb-3 py-2"
                  value={formData.author}
                  onChange={changeQuote}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="text" className="fs-4 mb-2">Quote text</label>
                <textarea
                  id="text"
                  name="text"
                  className="form-control border-primary fs-5 mb-4 py-2"
                  value={formData.text}
                  onChange={changeQuote}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-warning text-white fs-4 px-4 py-2 mb-3">
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteForm;