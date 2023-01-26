import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, TextField, Grid } from '@material-ui/core';
import { SimpleInput } from '../../components/common/SimpleInput';
import PhoneIcon from '@material-ui/icons/Phone';
import DescriptionIcon from '@material-ui/icons/Description';
import DomainIcon from '@material-ui/icons/Domain';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button } from 'antd';
import SimpleReactValidator from 'simple-react-validator';
import * as CommonRequest from '../../api/commonRequest';
import { createNewVendor } from '../../api/vendor';
import useAllStates from '../../utils/hooks/useAllStates';
import useAllCities from '../../utils/hooks/useAllCities';

const intialFormAttributes = {
  name: '',
  email: '',
  phone: '',
  description: '',
  password: '',
  state: '',
};

export const RegstrationFrom = () => {
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

  const allState = useAllStates();
  const allCities = useAllCities(formAttributes?.state?._id);

  const handleSubmit = () => {
    history.push('/');
  };

  const handleDropdownChange = (value, key) => {
    setFormAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      console.log('form not valid...');
      simpleValidator.current.showMessages();
      forceUpdate(1);
    } else {
      setIsLoading(true);
      const payload = {
        name: formAttributes.name,
        email: formAttributes.email,
        phone: formAttributes.contact,
        password: '12345',
        description: formAttributes.description,
        address: formAttributes.address,
        openDays: formAttributes.openDays.map((item) => item.value),
        openTime: formAttributes.openTime,
        closeTime: formAttributes.closeTime,
        zipCode: formAttributes.zipCode,
        state: formAttributes.state._id,
        city: formAttributes.city._id,
      };

      createNewVendor(payload)
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
      <div className="registration-form-sec">
        <Paper className="">
          <div className="card-header bg-transparent border-0 text-center text-uppercase">
            <h3 className="form-head">Registration</h3>
          </div>
          <div className="card-body">
            <Grid container spacing={20} className="form-container">
              <Grid container>
                <Grid item xs={6} className="form-input">
                  <SimpleInput
                    name={'name'}
                    type={'text'}
                    value={formAttributes?.name}
                    handleChange={handleChange}
                    placeholder={'Shop Name'}
                    label={'Shop Name'}
                    startIcon={<DomainIcon className="mr-3" />}
                  />
                  {simpleValidator.current.message('name', formAttributes?.name, 'required')}
                </Grid>
                <Grid item xs={6} className="form-input">
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
                <Grid item xs={6} className="form-input">
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
                <Grid item xs={6} className="form-input">
                  <SimpleInput
                    name={'confirmPassword'}
                    type={'text'}
                    value={formAttributes?.confirmPassword}
                    handleChange={handleChange}
                    placeholder={'Confirm Password'}
                    label={'Confirm Password'}
                    startIcon={<PhoneIcon className="mr-3" />}
                  />
                  {simpleValidator.current.message('confirmPassword', formAttributes?.confirmPassword, 'required')}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className="form-input">
                  <SimpleInput
                    name={'contact'}
                    type={'number'}
                    value={formAttributes?.contact}
                    handleChange={handleChange}
                    placeholder={'Contact Number'}
                    label={'Contact Number'}
                    startIcon={<PhoneIcon className="mr-3" />}
                  />
                  {simpleValidator.current.message('contact', formAttributes?.contact, 'required|phone')}
                </Grid>
                <Grid item xs={6} className="form-input">
                  <SimpleInput
                    name={'address'}
                    type={'text'}
                    value={formAttributes?.shop_name}
                    handleChange={handleChange}
                    placeholder={'Street'}
                    label={'Street'}
                    startIcon={<DomainIcon className="mr-3" />}
                  />
                  {simpleValidator.current.message('street', formAttributes?.address, 'required')}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4} className="form-input">
                  <SimpleInput
                    name={'zipCode'}
                    type={'text'}
                    value={formAttributes?.zipCode}
                    handleChange={handleChange}
                    placeholder={'Zip code'}
                    label={'Zip code'}
                    startIcon={<DomainIcon className="mr-3" />}
                  />
                  {simpleValidator.current.message('zipCode', formAttributes?.zipCode, 'required|integer')}
                </Grid>
                <Grid item xs={4} className="form-input">
                  <Autocomplete
                    autoHighlight
                    name="state"
                    id="combo-box-demo"
                    options={allState}
                    onChange={(e, value) => handleDropdownChange(value, 'state')}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    value={formAttributes.state}
                    renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
                  />
                  {simpleValidator.current.message('state', formAttributes?.state, 'required')}
                </Grid>
                <Grid item xs={4} className="form-input">
                  <Autocomplete
                    autoHighlight
                    name="city"
                    id="combo-box-demo"
                    options={allCities}
                    onChange={(e, value) => handleDropdownChange(value, 'city')}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    value={formAttributes.city}
                    renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                  />
                  {simpleValidator.current.message('city', formAttributes?.city, 'required')}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} className="form-input">
                  <SimpleInput
                    name={'description'}
                    type={'text'}
                    rows={3}
                    value={formAttributes?.description}
                    handleChange={handleChange}
                    placeholder={'Shop Description'}
                    label={'Shop Description'}
                    startIcon={<DescriptionIcon className="mr-3" />}
                  />
                  {simpleValidator.current.message('description', formAttributes?.description, 'required')}
                </Grid>
              </Grid>
              <Grid container className="submit-btn-div">
                <Button type="primary" shape="round" size="large" className="save-btn" onClick={handleSave}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </div>
  );
};
