import React, { useState, useEffect } from 'react';
import './index.css';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import AdminLayout from '../../../layouts/AdminLayout';
import Loader from '../../../components/common/Loader';
import { Row, Col } from 'react-bootstrap';
import { getAllBrands } from '../../../api/brand';
import { Switch } from '@material-ui/core';

const originData= [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const BrandList = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllBrands()
    .then((res) => {
      setData(res?.data?.map(item =>  {
        return {...item, isActive: item?.isActive ? true : false }
      }));
    })
    .catch((err) => console.log(err))
  },[])

  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({name: '', isActive: record?.isActive ? true : false, ...record });
    setEditingKey(record._id);
  };

  const handleChange=(e, index)=>{
    const updatedData = data?.map(item => item?._id == index ? {...item, isActive:!item.isActive} : item );
    console.log(updatedData, index);
    setData(updatedData);
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let inputNode = inputType === 'text' ? <Input /> : <Switch checked={record?.isActive} color={"primary"} onChange={(e) => handleChange(e, record?._id)}/>;
    
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = (await form.validateFields());

      const newData = [...data];
      const index = newData.findIndex((item) => key === item._id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log("newData",newData);
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '40%',
      editable: true,
    },
    {
      title: 'Is Active',
      dataIndex: 'isActive',
      width: '40%',
      editable: true,
      render: (_, record) => {
        return record?.isActive ? "Yes" : "No"
      }
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record._id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'isActive' ? 'checkbox' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <AdminLayout>
        <Row className="overview-sec">
            <Col sm="10">
                <h3>All Brands</h3>
            </Col>
            <Col sm="2">
                <button className='btn btn-primary float-right' onClick={() => {}}>
                    Add Brand
                </button>
            </Col>
        </Row>
        {isLoading && <Loader isLoading={isLoading} />}
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    </AdminLayout>
  );
};

export default BrandList;