import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Player from "./pages/player";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Alert, { AlertMessage } from "./components/alert";
import Writer from "./pages/writer";
import styled from "@emotion/styled";
import { Box } from "rebass";
import { ErrorResponse } from "./client/types";

const Top = styled(Box)`
  position: absolute;
  top: 20px;
  left: 50%;
`;

export enum Routes {
  HOME = "/",
  PLAYER_LIBRARY = "/player",
  WRITER_LIBRARY = "/writer",
}

export interface Messenger {
  readonly triggerMessage: (message: string) => void;
  readonly triggerAlert: (message: string) => void;
  readonly errorAlert: (err: ErrorResponse) => void;
}

export interface PageProps {
  readonly message: Messenger;
}

function App() {
  // Alerts
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const triggerMessage = (message: string): void => {
    setAlerts((prev) => [
      ...prev,
      { visible: true, message: message, warn: false },
    ]);
  };

  const triggerAlert = (message: string): void => {
    setAlerts((prev) => [
      ...prev,
      { visible: true, message: message, warn: true },
    ]);
  };

  const errorAlert = (err: ErrorResponse): void => {
    triggerAlert(err.message);
  };

  const message: Messenger = {
    triggerMessage,
    triggerAlert,
    errorAlert,
  };

  const deleteAlert = (i: number): void => {
    const copyAlerts = [...alerts];
    copyAlerts.splice(i, 1);
    setAlerts(copyAlerts);
  };

  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route path={Routes.HOME} exact>
            <Home message={message} />
          </Route>
          <Route path={Routes.PLAYER_LIBRARY} exact>
            <Player message={message} />
          </Route>
          <Route path={Routes.WRITER_LIBRARY} exact>
            <Writer message={message} />
          </Route>
        </Switch>
      </Router>

      <Top>
        {alerts.map((alert, i) => {
          return (
            <Alert
              key={i}
              visible={alert.visible}
              message={alert.message}
              warn={alert.warn}
              onClose={() => deleteAlert(i)}
            />
          );
        })}
      </Top>
    </div>
  );
}

export default App;
