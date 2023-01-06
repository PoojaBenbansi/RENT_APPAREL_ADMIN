import React, { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Row, Col } from 'react-bootstrap';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { getAllUsers, deleteUser, updateUserStatus } from '../../../api/user';
import { modifyUserObject } from '../../../utils/ArrayHelper';
import Loader from '../../../components/common/Loader';
import { Paper, Switch } from '@material-ui/core';
import { Table } from 'antd';
import DialogBox from '../../../components/common/DialogBox';

export const Users = () => {
  const [userList, setUserList] = React.useState([]);
  const [activeUser, setActiveUser] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Address',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: 'Is Verified',
      key: 'email_verified',
      render: (_, record) => {
        return record.email_verified ? <Chip label="Verified" color="primary" /> : <Chip label="Not Verified" color="danger" variant="outlined" />;
      },
    },
    {
      title: 'Status',
      key: 'id',
      render: (_, record) => (
        <>
          <Switch checked={record.isActive} onChange={() => handleStatusChange(record.id, record.isActive)} inputProps={{ 'aria-label': 'controlled' }} color="primary" />
        </>
      ),
    },
    {
      title: 'Action',
      key: 'id',
      render: (_, record) => (
        <>
          <Tooltip title="Delete">
            <DeleteForeverIcon color="secondary" onClick={() => handleDeleteClick(record)} />
          </Tooltip>
        </>
      ),
    },
  ];

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

  const handleUserDelete = () => {
    setDeleteModal(false);
    setIsLoading(true);
    deleteUser(activeUser.id)
      .then(() => {
        let oldUserList = JSON.parse(JSON.stringify(userList));
        oldUserList = oldUserList.filter((item) => item.id !== activeUser.id);
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
        <Loader isLoading={isLoading} />
        <Table columns={columns} dataSource={userList} />
      </Paper>
      {deleteModal && (
        <DialogBox
          show={deleteModal}
          handleClose={() => setDeleteModal(false)}
          handleAction={handleUserDelete}
          title={'Delete User'}
          body={'Are you sure you want to delete this User?'}
          action={'Delete'}
        />
      )}
    </AdminLayout>
  );
};
