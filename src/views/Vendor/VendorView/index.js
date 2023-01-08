import { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory, useParams } from 'react-router-dom';
import { Paper, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SimpleInput } from '../../../components/common/SimpleInput';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import DescriptionIcon from '@material-ui/icons/Description';
import DomainIcon from '@material-ui/icons/Domain';
import FileUpload from '../../../components/common/Dropzone/Dropzone';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

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
  shop_name: 'Shop 1',
  shop_address: '14555 Grisby Rd, Houston, Texas, United States 77079',
  shop_contact: '281-752-6990',
  email: 'harshitpratapsingh@gmail.com',
  shop_description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  is_approved: true,
  open_time: '10:00',
  close_time: '20:00',
  open_days: [],
  zipCode: 436353,
};

export default function VendorsView() {
  let history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const [formAttributes, setFormAttributes] = useState(intialFormAttributes);
  const [initFormAttributes, setInitFormAttributes] = useState(intialFormAttributes);
  const [selectedDaysOption, setSelectedDaysOption] = useState(daysOptions);
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });
  const format = 'HH:mm';
  const updateUploadedFiles = (files) => setNewUserInfo({ ...newUserInfo, profileImages: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to create new user...
  };

  const handleChange = (evt) => {
    setFormAttributes((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const resetHandler = (target) => {
    setFormAttributes((prev) => ({
      ...prev,
      [target]: initFormAttributes[target],
    }));
  };

  const saveHandler = (target) => {
    setInitFormAttributes((prev) => ({
      ...prev,
      [target]: formAttributes[target],
    }));
  };

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
  ];

  return (
    <AdminLayout>
      <h3 className="mt-2 mb-2">Vendor Details</h3>
      <Paper className={classes.paper}>
        <Grid container spacing={20} className="form-container">
          <Grid container>
            <Grid item xs={6} className="form-input">
              <SimpleInput
                name={'shop_name'}
                type={'text'}
                value={formAttributes?.shop_name}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Shop Name'}
                label={'Shop Name'}
                startIcon={<DomainIcon className="mr-3" />}
              />
            </Grid>
            <Grid item xs={6} className="form-input">
              <SimpleInput
                name={'shop_contact'}
                type={'email'}
                value={formAttributes?.email}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Email'}
                label={'Email'}
                startIcon={<PhoneIcon className="mr-3" />}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="form-input">
              <SimpleInput
                name={'shop_contact'}
                type={'text'}
                value={formAttributes?.shop_contact}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Contact Number'}
                label={'Contact Number'}
                startIcon={<PhoneIcon className="mr-3" />}
              />
            </Grid>
            <Grid item xs={6} className="form-input">
              <SimpleInput
                name={'shop_name'}
                type={'text'}
                value={formAttributes?.shop_name}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Address'}
                label={'Address'}
                startIcon={<DomainIcon className="mr-3" />}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4} className="form-input">
              <SimpleInput
                name={'zip_code'}
                type={'text'}
                value={formAttributes?.zipCode}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Zip code'}
                label={'Zip code'}
                startIcon={<DomainIcon className="mr-3" />}
              />
            </Grid>
            <Grid item xs={4} className="form-input">
              <Autocomplete
                autoHighlight
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.label}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
              />
            </Grid>
            <Grid item xs={4} className="form-input">
              <Autocomplete
                autoHighlight
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.label}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={3} className="form-input time-picker">
              <TimePicker placeholder="Opening Time" format={format} />
            </Grid>
            <Grid item xs={3} className="form-input time-picker">
              <TimePicker placeholder="Closing Time" format={format} />
            </Grid>
            <Grid item xs={6} className="form-input">
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={top100Films}
                getOptionLabel={(option) => option.label}
                defaultValue={[top100Films[2]]}
                renderInput={(params) => <TextField {...params} label="Open Days" variant="outlined" />}
                sx={{ width: '500px' }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className="form-input">
              <SimpleInput
                name={'shop_description'}
                type={'text'}
                rows={3}
                value={formAttributes?.shop_description}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Shop Description'}
                label={'Shop Description'}
                startIcon={<DescriptionIcon className="mr-3" />}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} className="form-input">
            <FileUpload accept=".jpg,.png,.jpeg" label="Shop Image(s)" multiple updateFilesCb={updateUploadedFiles} />
          </Grid>
        </Grid>
      </Paper>
    </AdminLayout>
  );
}
