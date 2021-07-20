import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Player from "./pages/player";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Alert from "./components/alert";

export enum Routes {
  HOME = "/",
  PLAYER_LIBRARY = "/player",
  WRITER_LIBRARY = "/writer",
}

export interface Messenger {
  readonly triggerMessage: (message: string) => void;
  readonly triggerAlert: (message: string) => void;
}

export interface PageProps {
  readonly message: Messenger;
}

function App() {
  // Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertWarn, setAlertWarn] = useState(false);

  const triggerMessage = (message: string): void => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const triggerAlert = (message: string): void => {
    triggerAlert(message);
    setAlertWarn(true);
  };

  const message: Messenger = {
    triggerMessage,
    triggerAlert,
  };

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

      <Alert
        visible={alertVisible}
        message={alertMessage}
        warn={alertWarn}
        onClose={() => setAlertVisible(false)}
      />
    </div>
  );
}

export default App;
