import React, { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Row, Col } from 'react-bootstrap';
import { getAllCategories, deleteCategory, updateCateroryStatus, addNewCategory, updateCategory } from '../../../api/category';
import { modifyCategoryObject } from '../../../utils/ArrayHelper';
import Loader from '../../../components/common/Loader';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditOutlined from '@material-ui/icons/EditTwoTone';
import DialogBox from '../../../components/common/DialogBox';
import { Table, Button } from 'antd';
import { Paper, Switch, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, MenuItem, Select, Box } from '@material-ui/core';

export const Categories = () => {
  const [dataList, setDataList] = React.useState([]);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [addEditModal, setAddEditModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const [parentCategory, setParentCategory] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Parent Category',
      dataIndex: 'parentCategory',
      key: 'parentCategory',
    },
    {
      title: 'Status',
      key: 'isActive',
      render: (_, record) => (
        <>
          <Switch checked={record.isActive} onChange={() => handleStatusChange(record.id, record.isActive)} inputProps={{ 'aria-label': 'controlled' }} color="primary" />
        </>
      ),
    },
    {
      title: 'Action',
      key: 'isDeleted',
      render: (_, record) => (
        <>
          <Tooltip title="Delete">
            <DeleteForeverIcon color="secondary" onClick={() => handleDeleteClick(record)} />
          </Tooltip>
          <Tooltip title="Edit" className="ml-2">
            <EditOutlined color="primary" onClick={() => handleEditClick(record)} />
          </Tooltip>
        </>
      ),
    },
  ];
  useEffect(() => {
    if (activeItem) {
      setName(activeItem.name);
      setParentCategory(activeItem.parentCategoryId);
    }
  }, [activeItem]);

  const getAllCategoryData = () => {
    getAllCategories()
      .then((res) => {
        setIsLoading(false);
        setDataList(modifyCategoryObject(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllCategoryData();
  }, []);

  const handleStatusChange = (id, status) => {
    updateCateroryStatus(id, !status)
      .then((res) => {
        let oldList = JSON.parse(JSON.stringify(dataList));
        const listIndex = oldList.findIndex((item) => item.id === id);
        oldList[listIndex] = { ...oldList[listIndex], isActive: !status };
        setDataList([...oldList]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = () => {
    setDeleteModal(false);
    setIsLoading(true);
    deleteCategory(activeItem.id)
      .then(() => {
        let oldList = JSON.parse(JSON.stringify(dataList));
        oldList = oldList.filter((item) => item.id !== activeItem.id);
        setDataList([...oldList]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteClick = (user) => {
    setActiveItem(user);
    setDeleteModal(true);
  };

  const handleEditClick = (item) => {
    setActiveItem(item);
    setAddEditModal(true);
    setIsEdit(true);
  };

  const handleSaveAddEditCategory = () => {
    if (name && parentCategory) {
      const payload = {
        name,
        parentCategory,
      };
      setIsLoading(true);
      setAddEditModal(false);
      if (isEdit) {
        updateCategory(payload, activeItem.id)
          .then((res) => {
            getAllCategoryData();
            setActiveItem(null);
            setName('');
            setParentCategory('');
            setIsLoading(false);
          })
          .catch((e) => console.error(e));
      } else {
        addNewCategory(payload)
          .then((res) => {
            getAllCategoryData();
            setActiveItem(null);
            setName('');
            setParentCategory('');
            setIsLoading(false);
          })
          .catch((e) => console.error(e));
      }
    }
  };

  const handleModalClose = () => {
    setAddEditModal(false);
    setParentCategory('');
    setName('');
    setActiveItem(null);
    setIsEdit(false);
  };

  return (
    <AdminLayout>
      <Row className="overview-sec">
        <Col sm="10">
          <h3>All Categories</h3>
        </Col>
        <Col sm="2">
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => {
              setIsEdit(false);
              setAddEditModal(true);
            }}
          >
            Add new category
          </Button>
        </Col>
      </Row>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Loader isLoading={isLoading} />
        <Table columns={columns} dataSource={dataList} />
      </Paper>
      {deleteModal && (
        <DialogBox
          show={deleteModal}
          handleClose={() => setDeleteModal(false)}
          handleAction={handleDelete}
          title={'Delete User'}
          body={'Are you sure you want to delete this Category?'}
          action={'Delete'}
        />
      )}

      <Dialog fullScreen={false} maxWidth={'md'} open={addEditModal} onClose={handleModalClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <div style={{ width: '500px' }}>
          <DialogTitle id="responsive-dialog-title">{isEdit ? `Edit category` : 'Add new category'}</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl className="mb-3" fullWidth>
                <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Parent category</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={parentCategory} label="Age" onChange={(e) => setParentCategory(e.target.value)}>
                  {dataList.map((row, index) => {
                    return (
                      <MenuItem value={row.id} key={index}>
                        {row.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} shape="round" size="default">
              Cancel
            </Button>
            <Button onClick={handleSaveAddEditCategory} type="primary" shape="round" size="default">
              Submit
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </AdminLayout>
  );
};
