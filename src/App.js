import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import PageNotFound from './views/PageNotFound';
import { Users } from './views/Admin/User/index';
import { Categories } from './views/Admin/Category/index';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/categories" component={Categories} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
