import Home from './Home';
import Post from './Post';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {  
  return (
    <Router>
    <div>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;

