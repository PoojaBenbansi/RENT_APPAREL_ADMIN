import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AdminLayout from '../../layouts/AdminLayout';
import Form from 'react-bootstrap/Form';
import Grid from '@material-ui/core/Grid';
import { Button } from 'react-bootstrap';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
}));

const intialFormAttributes= {
    first_name:'',
    middle_name:'',
    last_name:'',
    contact_no:'',
    emergency_contact_no:'',
    email:'',
    address:'',
    current_password:'',
    new_password:'',
    confirm_password:''
}

export const Setting = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [formAttributes, setFormAttributes] = useState(intialFormAttributes);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeHandler = evt => {
    setFormAttributes(prev => ({
      ...prev,
      [evt.target.name]:evt.target.value
    }));
  };

  return (
    <AdminLayout>
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Profile Detail" {...a11yProps(0)} />
                <Tab label="Change Password" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
            <Form>
                <Grid container spacing={3} className="mt-3">
                    <Grid item xs={4}>
                        <Form.Group controlId="fromFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name={'first_name'} placeholder="Enter First Name" onChange={changeHandler} value={formAttributes?.first_name}/>
                        </Form.Group>
                    </Grid>
                    <Grid item xs={4}>
                        <Form.Group controlId="fromMiddleName">
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" name={'middle_name'} placeholder="Enter Middle Name" onChange={changeHandler} value={formAttributes?.middle_name}/>
                        </Form.Group>
                    </Grid>
                    <Grid item xs={4}>
                        <Form.Group controlId="fromLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name={'last_name'} placeholder="Enter Last Name" onChange={changeHandler} value={formAttributes?.last_name}/>
                        </Form.Group>
                    </Grid>
                    <Grid item xs={4}>
                        <Form.Group controlId="fromEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name={'email'} placeholder="Enter Email Id" onChange={changeHandler} value={formAttributes?.email}/>
                        </Form.Group>
                    </Grid>
                    <Grid item xs={4}>
                        <Form.Group controlId="fromContactNo">
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control type="text" name={'contact_no'} placeholder="Enter Mobile Number" onChange={changeHandler} value={formAttributes?.mobile_no}/>
                        </Form.Group>
                    </Grid>
                    <Grid item xs={4}>
                        <Form.Group controlId="fromEmergencyContact">
                            <Form.Label>Emergency Contact</Form.Label>
                            <Form.Control type="text" name={'emergency_contact_no'} placeholder="Enter Emergency Contact" onChange={changeHandler} value={formAttributes?.emergency_contact_no}/>
                        </Form.Group>
                    </Grid>
                    <Grid item xs={12}>
                        <Form.Group controlId="fromAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Address"
                            style={{ height: '100px' }}
                            value={formAttributes?.address}
                        />
                        </Form.Group>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='d-flex justify-content-center'>
                            <Button className='btn btn-secondary mr-2'>Cancel</Button>
                            <Button className='btn btn-primary'>Submit</Button>
                        </div>
                    </Grid>
                </Grid>
            </Form>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Form>
                    <Grid container spacing={3} className="mt-3">
                        <Grid item xs={6}>
                            <Form.Group controlId="fromCurrentPassword">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password" name={'current_password'} placeholder="Enter Current Password" onChange={changeHandler} value={formAttributes?.current_password}/>
                            </Form.Group>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} className="mt-3">
                        <Grid item xs={6}>
                            <Form.Group controlId="fromNewPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" name={'new_password'} placeholder="Enter New Password" onChange={changeHandler} value={formAttributes?.new_password}/>
                            </Form.Group>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} className="mt-3">
                        <Grid item xs={6}>
                            <Form.Group controlId="fromConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name={'confirm_password'} placeholder="Enter Confirm Password" onChange={changeHandler} value={formAttributes?.confirm_password}/>
                            </Form.Group>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='d-flex justify-content-center mt-5'>
                            <Button className='btn btn-secondary mr-2'>Cancel</Button>
                            <Button className='btn btn-primary'>Submit</Button>
                        </div>
                    </Grid>
                </Form>
            </TabPanel>
        </div>
    </AdminLayout>
  );
}
