import { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { useHistory, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import FileUpload from '../../../components/common/Dropzone/Dropzone';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
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
  product_name: 'Product 1',
  shop_address: '14555 Grisby Rd, Houston, Texas, United States 77079',
  shop_contact:'(281) 752-6990 / (281) 752-6990',
  product_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  is_approved:true,
  open_time:'10:00',
  close_time:'20:00',
  open_days:[],
  price:'',
}

const categoryOpt = [
  { value: 'Category 1', label: 'Category 1' },
  { value: 'Category 2', label: 'Category 2' },
  { value: 'Category 3', label: 'Category 3' },
];

const subCategoryOpt = [
  { value: 'Sub Category 1', label: 'Sub Category 1' },
  { value: 'Sub Category 2', label: 'Sub Category 2' },
  { value: 'Sub Category 3', label: 'Sub Category 3' },
];

const brandOpt = [
  { value: 'Brand 1', label: 'Brand 1' },
  { value: 'Brand 2', label: 'Brand 2' },
  { value: 'Brand 3', label: 'Brand 3' },
];

export default function ProductEdit() {
  let history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const [formAttributes, setFormAttributes] = useState(intialFormAttributes);
  const [initFormAttributes, setInitFormAttributes] = useState(intialFormAttributes);
  const [selectedDaysOption, setSelectedDaysOption] = useState(daysOptions); 
  const [productImagesInfo, setProductImagesInfo] = useState({
    images: []
  });
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [selectedSubCategoryOption, setSelectedSubCategoryOption] = useState(null);
  const [selectedBrandOption, setSelectedBrandOption] = useState(null);

  const updateUploadedFiles = (files) =>
    setProductImagesInfo({ ...productImagesInfo, images: files });

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
      <Form>
        <Grid container spacing={3} className="mt-3">
          <Grid item xs={6}>
            <Form.Group controlId="fromProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Product Name" value={formAttributes?.product_name}/>
            </Form.Group>
          </Grid>
          <Grid item xs={6}>
            <Form.Group controlId="fromShopName">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control type="text" placeholder="Shop Name" disabled value={formAttributes?.shop_name}/>
              {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>
          </Grid>
          <Grid item xs={12}>
            <Form.Group controlId="fromProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product Description"
                style={{ height: '100px' }}
                value={formAttributes?.product_description}
              />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductCategory">
              <Form.Label>Category</Form.Label>
              <Select
                defaultValue={selectedCategoryOption}
                onChange={setSelectedCategoryOption}
                options={categoryOpt}
              />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductSubCategory">
              <Form.Label>Sub Category</Form.Label>
              <Select
                defaultValue={selectedSubCategoryOption}
                onChange={setSelectedSubCategoryOption}
                options={subCategoryOpt}
              />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductBrand">
              <Form.Label>Brand</Form.Label>
              <Select
                defaultValue={selectedBrandOption}
                onChange={setSelectedBrandOption}
                options={brandOpt}
              />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter Price" value={formAttributes?.price} />
            </Form.Group>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <FileUpload
                accept=".jpg,.png,.jpeg"
                label="Product Image(s)"
                multiple
                updateFilesCb={updateUploadedFiles}
              />
            </Paper>
          </Grid>
        </Grid>
      </Form>
    </AdminLayout>
  );
}
