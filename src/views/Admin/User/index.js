import React, { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Row, Col } from 'react-bootstrap';
import { getAllUsers, deleteUser, updateUserStatus } from '../../../api/user';
import { modifyUserObject } from '../../../utils/ArrayHelper';
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
} from '@material-ui/core';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'contact',
    label: 'contact',
  },
  {
    id: 'address',
    label: 'Address',
  },
  {
    id: 'city',
    label: 'City',
  },
  {
    id: 'state',
    label: 'State',
  },
  {
    id: 'email_verified',
    label: 'Verified',
  },
  {
    id: 'isActive',
    label: 'Status',
  },
  {
    id: 'isDeleted',
    label: 'Action',
  },
];

export const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userList, setUserList] = React.useState([]);
  const [activeUser, setActiveUser] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setIsLoading(false);
        setUserList(modifyUserObject(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusChange = (id, status) => {
    updateUserStatus(id, !status)
      .then((res) => {
        let oldUserList = JSON.parse(JSON.stringify(userList));
        const userIndex = oldUserList.findIndex((item) => item.id === id);
        oldUserList[userIndex] = { ...oldUserList[userIndex], isActive: !status };
        setUserList([...oldUserList]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUserDelete = (id) => {
    setDeleteModal(false);
    setIsLoading(true);
    deleteUser(id)
      .then(() => {
        let oldUserList = JSON.parse(JSON.stringify(userList));
        oldUserList = oldUserList.filter((item) => item.id !== id);
        setUserList([...oldUserList]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteClick = (user) => {
    setActiveUser(user);
    setDeleteModal(true);
  };

  return (
    <AdminLayout>
      <Row className="overview-sec">
        <Col sm="6">
          <h3>All Users</h3>
        </Col>
      </Row>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <Loader isLoading={isLoading} />
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row) => {
                console.log('row', row);
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
                            <i class="fa fa-trash deleteIcon" aria-hidden="true" onClick={() => handleDeleteClick(row)}></i>
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
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog fullScreen={false} open={deleteModal} onClose={() => setDeleteModal(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleUserDelete(activeUser.id)} autoFocus className="deleteBtn">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};
