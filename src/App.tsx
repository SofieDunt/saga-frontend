import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlayerLibrary from "./pages/playerLibrary";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import PlayPage from "./pages/playPage";

export enum Routes {
  HOME = "/",
  PLAYER_LIBRARY = "/player",
  WRITER_LIBRARY = "/writer",
  PLAY = "/player/play/:name",
}

export const ParameterizedRoutes = {
  PLAY: (name: string) => `/player/play/${name}`,
};

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route path={Routes.HOME} exact component={Home} />
          <Route path={Routes.PLAYER_LIBRARY} exact component={PlayerLibrary} />
          <Route path={Routes.PLAY} exact component={PlayPage} />
          <Route path={Routes.WRITER_LIBRARY} exact component={PlayerLibrary} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
