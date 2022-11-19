import { Container } from 'react-bootstrap';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className='content'>
      <Header />
      <Sidebar />

      <div className='main'>
        <Container fluid>{children}</Container>
      </div>
    </div>
  );
};
export default AdminLayout;
