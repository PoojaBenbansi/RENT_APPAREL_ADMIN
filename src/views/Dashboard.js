import Tasks from '../components/tables/Tasks';
import { ProgressBar, Card, Row, Col } from 'react-bootstrap';
import AdminLayout from '../layouts/AdminLayout';
import DashboardChart from '../components/charts/DashboardChart';

function Dashboard() {
  return (
    <AdminLayout>
      <Row className='overview-sec'>
        <Col sm='6'>
          <h3>Data Overview</h3>
        </Col>
        <Col sm='6'>
          <Row>
            <Col sm='6'>
              <ProgressBar now={70} />
            </Col>
            <Col sm='6'>
              <p>
                <b>643</b> insertion needed to complete
              </p>
            </Col>
          </Row>
        </Col>
      </Row>

      <Card className='card-stats'>
        <Card.Body>
          <DashboardChart />
          <Tasks />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
}

export default Dashboard;
