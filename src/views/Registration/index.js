import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const intialFormAttributes = {
  name: '',
  email: '',
  phone: '',
  description: '',
  password: '',
};

export const RegstrationFrom = () => {
  const [formAttributes, setFormAttributes] = useState(intialFormAttributes);
  let history = useHistory();

  const handleChange = (evt) => {
    setFormAttributes((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = () => {
    history.push('/');
  };

  return (
    <div className="container">
      <div className="container-fluid">
        <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
          <div className="card-header bg-transparent border-0 text-center text-uppercase">
            <h3>Vendor Registration</h3>
          </div>
          <div className="card-body">
            <Form>
              <div className="form-group">
                <label className="mb-0">
                  Name<span className="text-danger">*</span>
                </label>
                <input name="email" type="email" className="form-control" placeholder="Email" value={formAttributes?.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="mb-0">
                  Email<span className="text-danger">*</span>
                </label>
                <input name="password" type="password" className="form-control" placeholder="Password" value={formAttributes?.password} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="mb-0">
                  Phone<span className="text-danger">*</span>
                </label>
                <input name="email" type="email" className="form-control" placeholder="Email" value={formAttributes?.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="mb-0">
                  Password<span className="text-danger">*</span>
                </label>
                <input name="password" type="password" className="form-control" placeholder="Password" value={formAttributes?.password} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="mb-0">
                  Email<span className="text-danger">*</span>
                </label>
                <input name="email" type="email" className="form-control" placeholder="Email" value={formAttributes?.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="mb-0">
                  Password<span className="text-danger">*</span>
                </label>
                <input name="password" type="password" className="form-control" placeholder="Password" value={formAttributes?.password} onChange={handleChange} />
              </div>
              <p className="text-center mb-0">
                <input type="submit" className="btn btn-primary btn-lg w-100 text-uppercase" value="Sign in" onClick={handleSubmit} />
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
