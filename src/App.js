import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { firebaseAuth } from "./provider/AuthProvider";
import Signup from "./component/Signup";
import Signin from "./component/Signin";
import Home from "./component/Home";
import "./App.css";

function App() {
  const { token } = useContext(firebaseAuth);
  console.log(token);

  return (
    <>
      {/* switch allows switching which components render.  */}
      <Switch>
        {/* route allows you to render by url path */}
        <Route
          exact
          path='/'
          render={() => (token === null ? <Signup /> : <Home />)}
        />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </>
  );
}

export default App;
