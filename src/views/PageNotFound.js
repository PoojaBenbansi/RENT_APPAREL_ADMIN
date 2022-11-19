import React from 'react';
import error from '../assets/images/error-red.png';
import { Row } from 'react-bootstrap';
import AdminLayout from '../layouts/AdminLayout';

export default function PageNotFound() {
  return (
    <AdminLayout>
      <Row>
        <div className='error-page'>
          <img src={error} className='img-fluid' />
          <h1>404!</h1>
          <h3>PAGE NOT FOUND</h3>
        </div>
      </Row>
    </AdminLayout>
  );
}
