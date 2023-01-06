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
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Mail Id',
      dataIndex: 'email',
      key: 'email',
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
        setVendorList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function createData(name, state, contact, total, email, isVerified) {
    return { name, state, contact, total, email, isVerified };
  }

  const data = [
    createData('Shop 1', 'Mumbai', 924171354, 520, 'shop1@abc.com', true),
    createData('Shop 2', 'Pune', 803500365, 300, 'shop2@abc.com', false),
    createData('Shop 3', 'Kanpur', 760483973, 289, 'shop3@abc.com', true),
    createData('Shop 4', 'Agra', 827167434, 400, 'shop4@abc.com', true),
    createData('Shop 5', 'Raebareli', 937602103, 390, 'shop5@abc.com', true),
    createData('Shop 6', 'Mumbai', 95475400, 500, 'shop6@abc.com', false),
    createData('Shop 7', 'Pune', 83019200, 456, 'shop7@abc.com', true),
    createData('Shop 8', 'Kanpur', 9857000, 789, 'shop8@abc.com', false),
    createData('Shop 9', 'Agra', 896577691, 345, 'shop9@abc.com', true),
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
        <Table columns={columns} dataSource={data} />
      </Paper>
    </AdminLayout>
  );
}
