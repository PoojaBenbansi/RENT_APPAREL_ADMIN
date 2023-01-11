import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SimpleInput } from '../../../components/common/SimpleInput';
import PhoneIcon from '@material-ui/icons/Phone';
import DescriptionIcon from '@material-ui/icons/Description';
import DomainIcon from '@material-ui/icons/Domain';
import FileUpload from '../../../components/common/Dropzone/Dropzone';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import * as CommonRequest from '../../../api/commonRequest';
import { getVendorDetails } from '../../../api/vendor';
import SimpleReactValidator from 'simple-react-validator';
import { Button } from 'antd';
import { createNewVendor } from '../../../api/vendor';
import Loader from '../../../components/common/Loader';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const daysOptions = [
  { value: 'Sunday', label: 'Sunday' },
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thrusday', label: 'Thrusday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
];

const intialFormAttributes = {
  name: '',
  address: '',
  contact: '',
  email: '',
  description: '',
  openTime: '08:00',
  closeTime: '20:00',
  openDays: [],
  zipCode: '',
  city: '',
  state: '',
};

export default function VendorsView() {
  const classes = useStyles();
  const [formAttributes, setFormAttributes] = useState(intialFormAttributes);
  const [allCity, setCities] = useState([]);
  const [allState, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const format = 'HH:mm';
  const updateUploadedFiles = (files) => setNewUserInfo({ ...newUserInfo, profileImages: files });

  const fetchStates = () => {
    CommonRequest.getStates()
      .then((response) => setStates(response?.data))
      .catch((error) => console.log(error));
  };

  const fetchCities = (state_id) => {
    CommonRequest.getCities(state_id)
      .then((response) => setCities(response?.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchStates();
    getVendorDetails('63bcf5a486b80e0d44fc8887')
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

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

  const handleChange = (evt) => {
    setFormAttributes((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleDropdownChange = (value, key) => {
    setFormAttributes((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === 'state') {
      fetchCities(value._id);
    }
  };

  return (
    <AdminLayout>
      <h3 className="mt-2 mb-2">Vendor Details</h3>
      <Paper className={classes.paper}>
        <Loader isLoading={isLoading} />
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
                options={allCity}
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
            <Grid item xs={3} className="form-input time-picker">
              <TimePicker
                placeholder="Opening Time"
                format={format}
                value={dayjs(formAttributes.openTime, format)}
                onChange={(e, value) => handleDropdownChange(value, 'openTime')}
              />
              {simpleValidator.current.message('opening', formAttributes?.openTime, 'required')}
            </Grid>
            <Grid item xs={3} className="form-input time-picker">
              <TimePicker
                placeholder="Closing Time"
                format={format}
                value={dayjs(formAttributes.closeTime, format)}
                onChange={(e, value) => handleDropdownChange(value, 'closeTime')}
              />
              {simpleValidator.current.message('closing', formAttributes?.closeTime, 'required')}
            </Grid>
            <Grid item xs={6} className="form-input">
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                value={formAttributes?.openDays}
                options={daysOptions}
                name="openDays"
                onChange={(e, value) => handleDropdownChange(value, 'openDays')}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} label="Open Days" variant="outlined" />}
                sx={{ width: '500px' }}
              />
              {simpleValidator.current.message('openDays', formAttributes?.openDays, 'required')}
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
          <Grid item xs={12} className="form-input">
            <FileUpload accept=".jpg,.png,.jpeg" label="Shop Image(s)" multiple updateFilesCb={updateUploadedFiles} />
          </Grid>
          <Button type="primary" shape="round" size="large" className="save-btn" onClick={handleSave}>
            Submit
          </Button>
        </Grid>
      </Paper>
    </AdminLayout>
  );
}
