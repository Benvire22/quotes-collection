import React, { useState } from 'react';

interface UserForm {
  category: string;
  author: string;
  text: string;
}

const QuoteForm = () => {
  const [formData, setFormData] = useState<UserForm>({
    category: 'humor',
    author: '',
    text: ''
  });

  const changeUser = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      category: 'humor',
      author: '',
      text: ''
    });
  };

  return (
    <>
      <div className="row px-5 fs-5">
        <h3 className="text-warning text-center fs-1 mb-5">Add Quote</h3>
        <div className="row mt-2 justify-content-center">
          <div className="col-8 text-primary-emphasis">
            <form onSubmit={onFormSubmit}>
              <div className="form-group">
                <label htmlFor="category" className="fs-4 mb-2">Select Category</label>
                <select className="form-select" name="category" id="category" aria-label="Default select categories"
                        onChange={changeUser}>
                  <option value="humor">Humor</option>
                  <option value="star-wars">Star wars</option>
                  <option value="saying">Saying</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="author" className="fs-4 mb-2">Author</label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  className="form-control border-primary fs-5 mb-3 py-2"
                  value={formData.author}
                  onChange={changeUser}
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
                  onChange={changeUser}
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
  )
    ;
};

export default QuoteForm;