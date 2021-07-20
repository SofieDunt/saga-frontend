import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Player from "./pages/player";
import NavBar from "./components/navBar";
import Home from "./pages/home";

export enum Routes {
  HOME = "/",
  PLAYER_LIBRARY = "/player",
  WRITER_LIBRARY = "/writer",
}

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route path={Routes.HOME} exact component={Home} />
          <Route path={Routes.PLAYER_LIBRARY} exact component={Player} />
          <Route path={Routes.WRITER_LIBRARY} exact component={Player} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
