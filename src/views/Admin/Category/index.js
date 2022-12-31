import React, { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Row, Col } from 'react-bootstrap';
import { getAllCategories, deleteCategory, updateCateroryStatus, addNewCategory } from '../../../api/category';
import { modifyCategoryObject } from '../../../utils/ArrayHelper';
import Loader from '../../../components/common/Loader';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from '@material-ui/core';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'parentCategory', label: 'Parent Category', minWidth: 100 },
  {
    id: 'isActive',
    label: 'Status',
  },
  {
    id: 'isDeleted',
    label: 'Action',
  },
];

export const Categories = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataList, setDataList] = React.useState([]);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [addEditModal, setAddEditModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [name, setName] = React.useState('');
  const [parentCategory, setParentCategory] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);

  useEffect(() => {
    if(activeItem){
      setName();
      setParentCategory();
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const handleDelete = (id) => {
    setDeleteModal(false);
    setIsLoading(true);
    deleteCategory(id)
      .then(() => {
        let oldList = JSON.parse(JSON.stringify(dataList));
        oldList = oldList.filter((item) => item.id !== id);
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
  };

  const handleModalClose = () => {
    setAddEditModal(false);
    setParentCategory('');
    setName('');
  };

  return (
    <AdminLayout>
      <Row className="overview-sec">
        <Col sm="6">
          <h3>All Categories</h3>
        </Col>
        <Col sm="6">
          <Button
            variant="contained"
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
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <Loader isLoading={isLoading} />
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'isActive') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Switch checked={value} onChange={() => handleStatusChange(row.id, value)} inputProps={{ 'aria-label': 'controlled' }} color="primary" />
                          </TableCell>
                        );
                      } else if (column.id === 'isDeleted') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <i className="fa fa-trash deleteIcon" aria-hidden="true" onClick={() => handleDeleteClick(row)}></i>
                            <i className="fa fa-edit editIcon" aria-hidden="true" onClick={() => handleEditClick(row)}></i>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog fullScreen={false} open={deleteModal} onClose={() => setDeleteModal(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this category ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(activeItem.id)} autoFocus className="deleteBtn">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={false}
        maxWidth={'md'}
        open={addEditModal}
        onClose={() => setAddEditModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
            <Button onClick={handleModalClose}>Cancel</Button>
            <Button onClick={handleSaveAddEditCategory} autoFocus>
              Submit
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </AdminLayout>
  );
};
