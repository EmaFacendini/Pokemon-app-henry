import React from "react";
import './App.css';
import Home from './Components/Home/Home';
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import Form from './Components/Form/Form.jsx';
import Detail from './Components/Detail/Detail';
import { Route, Switch } from "react-router-dom";


function App() {

  return (
     <React.Fragment>
      <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route path="/pokemon/:id" component={Detail} />
        <Route path="/create" component={Form} />
        {/* <Route path="/about" component={About} /> */}
      </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;