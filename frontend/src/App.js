import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './App.css';

import Register from "./Components/RegisterPage/Register"
import Login from "./Components/LoginPage/Login"
import MainPage from "./Components/MainPage/MainPage"

import ProtectedRoute from "./Components/Auth/ProtectedRoute"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
          <ProtectedRoute exact path='/main' component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
