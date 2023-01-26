import { Container } from 'react-bootstrap';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import useOnline from '../utils/hooks/useOnline';

const AdminLayout = ({ children }) => {
  const isOnline = useOnline();
  console.log('isOnline', isOnline);
  return (
    <div className="content">
      <Header />
      <Sidebar />
      {isOnline ? (
        <div className="main">
          <Container fluid>{children}</Container>
        </div>
      ) : (
        <p>No Internet connection, Please check your internet connection!!</p>
      )}
    </div>
  );
};
export default AdminLayout;
