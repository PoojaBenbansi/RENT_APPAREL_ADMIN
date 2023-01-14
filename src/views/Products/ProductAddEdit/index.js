import { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { useHistory, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import FileUpload from '../../../components/common/Dropzone/Dropzone';
import { getAllCategories } from '../../../api/category';
import { getAllBrands } from '../../../api/brand';
import * as ProductApi from '../../../api/product';
import Loader from '../../../components/common/Loader';
import { Row, Col } from 'react-bootstrap';

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

const intialFormAttributes = {
  product_name: 'Product 1',
  shop_contact:'(281) 752-6990 / (281) 752-6990',
  vendor_id:'',
  product_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  category:'',
  subCategory:'',
  brand:'',
  title:'',
  price:'',
  color:'',
  size:'',
  availablity:''
}

export default function ProductEdit() {
  let history = useHistory();
  const { id, mode } = useParams();
  const classes = useStyles();
  const [formAttributes, setFormAttributes] = useState(intialFormAttributes);
  const [initFormAttributes, setInitFormAttributes] = useState(intialFormAttributes);
  const [productImagesInfo, setProductImagesInfo] = useState({
    images: []
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrandOption, setSelectedBrandOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allOptions, setAllOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        setAllOptions(res?.data);
        const parentCategory = res?.data?.filter(item => !item?.parentCategory);
        setCategoryOptions(parentCategory?.map(item => {
          return {
            value:item?._id,
            label:item?.name
          }
        }));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });

      getAllBrands()
      .then((res) => {
        setBrandOptions(res?.data?.map(item => {
          return {
            value:item?._id,
            label:item?.name
          }
        }));
      })
      .catch((err) => console.log(err))
  }, []);

  const updateUploadedFiles = (files) =>
    setProductImagesInfo({ ...productImagesInfo, images: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name:formAttributes?.product_name,
      brand: selectedBrandOption?.value,
      priceCurrency:"INR",
      type:'New',
      isFeatured:0,
      vendorId:'',
      productVariant:{
        title:formAttributes?.title,
        color: formAttributes?.color,
        size: formAttributes?.size,
        price: formAttributes?.price,
        availablity: formAttributes?.availablity
      },
      productCategory:selectedCategory?.value,
      productSubCategory:selectedSubCategory?.value
    }
    // if(mode == 'add'){

    // }else{

    // }
    ProductApi.createProduct({payload})
    .then(()=>{})
    .catch(()=>{})
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

  const onCategorySelectHandler = (category) => {
    setSelectedCategory(category);
    const subCategoryOption = allOptions?.filter(item => item?.parentCategory?._id == category?.value);
    setSubCategoryOptions(subCategoryOption?.map(item => {
      return {
        value:item?._id,
        label:item?.name
      }
    }));
  }

  return (
    <AdminLayout>
      {isLoading && <Loader isLoading={isLoading} />}
      <Row className="overview-sec">
      <Col sm="6"></Col>
        <Col sm="6">
          <button className='btn btn-secondary float-right' onClick={() => history.push('/products')}>Cancel</button>
          <button className='btn btn-primary float-right mr-2' onClick={handleSubmit}>Save</button>
        </Col>
      </Row>
      <Form>
        <Grid container spacing={3} className="mt-3">
          <Grid item xs={6}>
            <Form.Group controlId="fromProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" onChange={handleChange} name={"product_name"} placeholder="Enter Product Name" value={formAttributes?.product_name}/>
            </Form.Group>
          </Grid>
          <Grid item xs={6}>
            <Form.Group controlId="fromShopName">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control type="text" placeholder="Shop Name" name={"shop_name"} disabled value={formAttributes?.shop_name}/>
            </Form.Group>
          </Grid>
          <Grid item xs={12}>
            <Form.Group controlId="fromProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product Description"
                style={{ height: '60px' }}
                value={formAttributes?.product_description}
                name={"product_description"}
                onChange={handleChange}
              />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductCategory">
              <Form.Label>Category</Form.Label>
              <Select
                defaultValue={selectedCategory}
                onChange={onCategorySelectHandler}
                options={categoryOptions}
                name={"category"}
              />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductSubCategory">
              <Form.Label>Sub Category</Form.Label>
              <Select
                defaultValue={selectedSubCategory}
                onChange={setSelectedSubCategory}
                options={subCategoryOptions}
                name={"subCategory"}
              />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductBrand">
              <Form.Label>Brand</Form.Label>
              <Select
                defaultValue={selectedBrandOption}
                onChange={setSelectedBrandOption}
                options={brandOptions}
                name={"brands"}
              />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter Price" name={"price"} onChange={handleChange} value={formAttributes?.price} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductTitle">
                <Form.Label>Variant Title</Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="Enter Variant Title" name={"title"} value={formAttributes?.title} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductSize">
                <Form.Label>Size</Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="Enter Size" name={"size"} value={formAttributes?.size} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="fromProductColor">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="Enter Color" name={"color"} value={formAttributes?.color} />
            </Form.Group>
          </Grid>
           <Grid item xs={3}>
            <Form.Group controlId="fromProductAvailablity">
                <Form.Label>Availablity</Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="Enter Availablity" name={"availablity"} value={formAttributes?.availablity} />
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
