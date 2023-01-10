import * as React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import EmailIcon from '@material-ui/icons/Email';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import DialogBox from '../../../components/common/DialogBox';
import { Table } from 'antd';
import { Paper } from '@material-ui/core';
import { getAllVendor } from '../../../api/vendor';
import Loader from '../../../components/common/Loader';
import { modifyVendorObject } from '../../../utils/ArrayHelper';

export default function VendorsList() {
  let history = useHistory();
  const [deleteItemDialog, showDeleteItemDialog] = React.useState(false);
  const [vendorList, setVendorList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mail Id',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Total Products',
      key: 'total',
      dataIndex: 'total',
    },
    {
      title: 'Is Verified',
      key: 'isVerified',
      render: (_, record) => {
        return record ? <Chip label="Verified" color="primary" /> : <Chip label="Not Verified" color="danger" variant="outlined" />;
      },
    },
    {
      title: 'Action',
      key: 'id',
      render: (_, record) => (
        <>
          <Tooltip title="View">
            <RemoveRedEyeIcon color="default" onClick={viewShopHandler} />
          </Tooltip>
          <Tooltip title="Send Email">
            <EmailIcon color="primary" />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteForeverIcon color="secondary" onClick={viewDeleteModal} />
          </Tooltip>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    getAllVendor()
      .then((res) => {
        setIsLoading(false);
        setVendorList(modifyVendorObject(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const viewShopHandler = () => history.push('/vendors/view/Shop1');

  const viewDeleteModal = () => showDeleteItemDialog(true);

  return (
    <AdminLayout>
      <Row className="overview-sec">
        <Col sm="6">
          <h3>All Vendors</h3>
        </Col>
      </Row>
      {deleteItemDialog && (
        <DialogBox
          show={deleteItemDialog}
          showDeleteItemDialog={showDeleteItemDialog}
          title={'Delete Vendor'}
          body={'Are you sure you want to delete this Vendor?'}
          action={'Delete'}
        />
      )}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Loader isLoading={isLoading} />
        <Table columns={columns} dataSource={vendorList} />
      </Paper>
    </AdminLayout>
  );
}
