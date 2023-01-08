import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import PageNotFound from './views/PageNotFound';
import VendorsList from './views/Vendor/VendorList';
import VendorsView from './views/Vendor/VendorView';
import { Users } from './views/Admin/User/index';
import { Categories } from './views/Admin/Category/index';
import ProductList from './views/Products/ProductList';
import ProductEdit from './views/Products/ProductEdit';
import { Setting } from './views/Settings';
import { LoginForm } from './views/Login';
import { RegstrationFrom } from './views/Registration';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/vendors" component={VendorsList} />
      <Route exact path="/vendors/view/:id" component={VendorsView} />
      <Route exact path="/categories" component={Categories} />
      <Route exact path="/products" component={ProductList} />
      <Route exact path="/product/edit/:id" component={ProductEdit} />
      <Route exact path="/setting" component={Setting} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/registration" component={RegstrationFrom} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
