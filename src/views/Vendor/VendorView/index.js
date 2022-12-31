import { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory, useParams } from "react-router-dom";
import { Paper } from '@material-ui/core';
import { InputInlineEdit } from '../../../components/common/InputInlineEdit';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import DescriptionIcon from '@material-ui/icons/Description';
import DomainIcon from '@material-ui/icons/Domain';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { TimePickerField } from '../../../components/common/TimePicker';
import FileUpload from '../../../components/common/Dropzone/Dropzone';
import { MultiSelectDropdown } from '../../../components/common/MultiSelectDropdown';

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
]

const intialFormAttributes = {
  shop_name: 'Shop 1',
  shop_address: '14555 Grisby Rd, Houston, Texas, United States 77079',
  shop_contact:'(281) 752-6990 / (281) 752-6990',
  shop_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  is_approved:true,
  open_time:'10:00',
  close_time:'20:00',
  open_days:[]
}

export default function VendorsView() {
  let history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const [formAttributes, setFormAttributes] = useState(intialFormAttributes);
  const [initFormAttributes, setInitFormAttributes] = useState(intialFormAttributes);
  const [selectedDaysOption, setSelectedDaysOption] = useState(daysOptions); 
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to create new user...
  };

  const handleChange = evt => {
    setFormAttributes(prev => ({
      ...prev,
      [evt.target.name]:evt.target.value
    }));
  };

  const resetHandler = (target) => {
    setFormAttributes(prev => ({
      ...prev,
      [target]:initFormAttributes[target]
    }));
  }

  const saveHandler = (target) => {
    setInitFormAttributes(prev => ({
      ...prev,
      [target]:formAttributes[target]
    }));
  }

  return (
    <AdminLayout>
        <Grid container spacing={3} className="mt-3">
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <InputInlineEdit 
                name={'shop_name'}
                type={'text'}
                value={formAttributes?.shop_name}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Shop Name'}
                startIcon={<DomainIcon className='mr-3'/>}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <InputInlineEdit 
                name={'shop_contact'}
                type={'text'}
                value={formAttributes?.shop_contact}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Contact Number'}
                startIcon={<PhoneIcon className='mr-3'/>}
              />
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <InputInlineEdit 
                name={'is_approved'}
                type={'text'}
                value={formAttributes?.is_approved ? "Verified" : "Not Verified"}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Is Approved'}
                isFieldEditable={false}
                startIcon={<DoneAllIcon className='mr-3'/>}
              />
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <TimePickerField pickerValue={formAttributes?.open_time}/>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <TimePickerField pickerValue={formAttributes?.close_time}/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <MultiSelectDropdown 
                options={daysOptions}
                name={'weekdays'}
                placeholder={'Open Days'}
                selectedOption={selectedDaysOption}
                setSelectedOption={setSelectedDaysOption}
            />
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <InputInlineEdit 
                name={'shop_address'}
                type={'text'}
                value={formAttributes?.shop_address}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Shop Address'}
                startIcon={<LocationOnIcon  className='mr-3'/>}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <InputInlineEdit 
                name={'shop_description'}
                type={'text'}
                value={formAttributes?.shop_description}
                handleChange={handleChange}
                saveHandler={saveHandler}
                resetHandler={resetHandler}
                placeholder={'Shop Address'}
                startIcon={<DescriptionIcon className='mr-3'/>}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <FileUpload
                accept=".jpg,.png,.jpeg"
                label="Shop Image(s)"
                multiple
                updateFilesCb={updateUploadedFiles}
              />
            </Paper>
          </Grid>
        </Grid>
    </AdminLayout>
  );
}
