import {Route, Switch} from 'react-router-dom'
import './App.css'
import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import JobsRoute from './components/JobsRoute'

import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    </Switch>
  </>
)

export default App
