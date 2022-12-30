import * as React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Row, Col } from 'react-bootstrap';
import Chip from '@material-ui/core/Chip';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EmailIcon from '@material-ui/icons/Email';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import DialogBox from '../../../components/common/DialogBox';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

const columns = [
  { id: 'product_name', label: 'Product Name', minWidth: 170 },
  { id: 'shop_name', label: 'Shop Name', minWidth: 100 },
  { id: 'brand_name', label: 'Brand Name', minWidth: 100 },
  {
    id: 'product_type',
    label: 'Type',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100,
    align: 'right',
    format: (value) => { return <>&#x20b9; {value} /-</>;}
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'sub_category',
    label: 'Sub Category',
    minWidth: 100,
    align: 'right',
  },
];

function createData(product_name, shop_name, brand_name, product_type, price, category, sub_category) {
  return { product_name, shop_name, brand_name, product_type, price, category, sub_category };
}

const rows = [
  createData('Product 1', 'Shop 1', 'Brand 1', 'New', 520, 'Category 1', 'Sub Category 1'),
  createData('Product 2', 'Shop 2', 'Brand 2', 'Sale', 300, 'Category 2', 'Sub Category 2'),
  createData('Product 3', 'Shop 3', 'Brand 3', 'Re-Sale', 289, 'Category 3', 'Sub Category 3'),
  createData('Product 4', 'Shop 4', 'Brand 4', 'Sale', 400, 'Category 4', 'Sub Category 4'),
  createData('Product 5', 'Shop 5', 'Brand 5', 'New', 390, 'Category 3', 'Sub Category 5'),
  createData('Product 6', 'Shop 6', 'Brand 6', 'New', 500, 'Category 4', 'Sub Category 6'),
  createData('Product 7', 'Shop 7', 'Brand 7', 'Sale', 456, 'Category 1', 'Sub Category 7'),
  createData('Product 8', 'Shop 8', 'Brand 8', 'Re-Sale', 789, 'Category 5', 'Sub Category 8'),
  createData('Product 9', 'Shop 9', 'Brand 9', 'Sale', 345, 'Category 2', 'Sub Category 9'),
  createData('Product 10', 'Shop 10', 'Brand 10','Sale', 564, 'Category 1', 'Sub Category 10'),
];

export default function ProductList() {
  let history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteItemDialog, showDeleteItemDialog] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const viewShopHandler = () => history.push('/product/edit/Product1');

  const viewDeleteModal = () => showDeleteItemDialog(true);

  return (
    <AdminLayout>
      <Row className="overview-sec">
        <Col sm="6">
          <h3>All Products</h3>
        </Col>
      </Row>
      {deleteItemDialog && <DialogBox 
        show={deleteItemDialog} 
        showDeleteItemDialog={showDeleteItemDialog}
        title={'Delete Product'}
        body={'Are you sure you want to delete this product?'}
        action={'Delete'}
      />}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key={'actions'} align={'center'} style={{ minWidth: '170' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (<>
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' || typeof value === 'boolean' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                      <TableCell key={'a'+row.id} align={'center'}>
                        <Tooltip title="View">
                          <RemoveRedEyeIcon color="default" onClick={viewShopHandler}/>
                        </Tooltip>
                        <Tooltip title="Send Email">
                          <EmailIcon color="primary" />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteForeverIcon color="secondary" onClick={viewDeleteModal}/>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </AdminLayout>
  );
}
