import * as React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Row, Col } from 'react-bootstrap';
import Chip from '@material-ui/core/Chip';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EmailIcon from '@material-ui/icons/Email';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

const columns = [
  { id: 'name', label: 'Shop Name', minWidth: 170 },
  { id: 'state', label: 'State', minWidth: 100 },
  {
    id: 'contact',
    label: 'Contact',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'total',
    label: 'Total Products',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'email',
    label: 'Mail Id',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'isVerified',
    label: 'Is Verified',
    minWidth: 170,
    align: 'right',
    format: (value) =>  { return value ? <Chip label="Verified" color="primary" /> : <Chip label="Not Verified" color="danger" variant="outlined" />},
  },
];

function createData(name, state, contact, total, email, isVerified) {
  return { name, state, contact, total, email, isVerified };
}

const rows = [
  createData('Shop 1', 'Mumbai', 924171354, 520, 'shop1@abc.com', true),
  createData('Shop 2', 'Pune', 803500365, 300, 'shop2@abc.com', false),
  createData('Shop 3', 'Kanpur', 760483973, 289, 'shop3@abc.com', true),
  createData('Shop 4', 'Agra', 827167434, 400, 'shop4@abc.com', true),
  createData('Shop 5', 'Raebareli', 937602103, 390, 'shop5@abc.com', true),
  createData('Shop 6', 'Mumbai', 95475400, 500, 'shop6@abc.com', false),
  createData('Shop 7', 'Pune', 83019200, 456, 'shop7@abc.com', true),
  createData('Shop 8', 'Kanpur', 9857000, 789, 'shop8@abc.com', false),
  createData('Shop 9', 'Agra', 896577691, 345, 'shop9@abc.com', true),
  createData('Shop 10', 'Raebareli', 726317000, 564, 'shop10@abc.com', true),
];

export default function VendorsList() {
  let history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const viewShopHandler = () => history.push('/vendors/view/Shop1');

  return (
    <AdminLayout>
      <Row className="overview-sec">
        <Col sm="6">
          <h3>All Vendors</h3>
        </Col>
      </Row>
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
                          <DeleteForeverIcon color="secondary" />
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
