import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';
import { SimpleInput } from '../../components/common/SimpleInput';
import PhoneIcon from '@material-ui/icons/Phone';
import DomainIcon from '@material-ui/icons/Domain';
import { Button } from 'antd';
import SimpleReactValidator from 'simple-react-validator';
import { vendorLogin } from '../../api/vendor';
import Loader from '../../components/common/Loader';

const intialFormAttributes = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const [formAttributes, setFormAttributes] = useState(intialFormAttributes);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [isLoading, setIsLoading] = useState(false);
  const [, forceUpdate] = useState();
  let history = useHistory();

  const handleChange = (evt) => {
    setFormAttributes((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSave = () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    } else {
      setIsLoading(true);
      const payload = {
        email: formAttributes.email,
        password: formAttributes.password,
      };
      vendorLogin(payload)
        .then((res) => {
          setIsLoading(false);
          console.log('res', res);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log('err', err);
        });
    }
  };

  return (
    <div className="registration-form">
      <div className="login-form-sec">
        <Paper>
          <Loader isLoading={isLoading} />
          <div className="login-form">
            <div className="card-header bg-transparent border-0 text-center text-uppercase">
              <h3 className="form-head">Login</h3>
            </div>
            <div className="card-body">
              <Grid container spacing={20} className="form-container">
                <Grid container>
                  <Grid item xs={12} className="form-input">
                    <SimpleInput
                      name={'email'}
                      type={'email'}
                      value={formAttributes?.email}
                      handleChange={handleChange}
                      placeholder={'Email'}
                      label={'Email'}
                      startIcon={<PhoneIcon className="mr-3" />}
                    />
                    {simpleValidator.current.message('email', formAttributes?.email, 'required|email')}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} className="form-input">
                    <SimpleInput
                      name={'password'}
                      type={'text'}
                      value={formAttributes?.password}
                      handleChange={handleChange}
                      placeholder={'Password'}
                      label={'Password'}
                      startIcon={<DomainIcon className="mr-3" />}
                    />
                    {simpleValidator.current.message('name', formAttributes?.password, 'required')}
                  </Grid>
                </Grid>

                <Grid container className="submit-btn-div">
                  <Button type="primary" shape="round" size="large" className="save-btn" onClick={handleSave}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};
