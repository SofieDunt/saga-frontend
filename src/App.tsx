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
import WorkEditor from "./pages/workEditor";
import StoryPlayer from "./pages/storyPlayer";

const Top = styled(Box)`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 4;
`;

export enum Routes {
  HOME = "/",
  PLAYER_LIBRARY = "/player",
  WRITER_LIBRARY = "/writer",
  PLAYER_PLAY = "/player/play",
  WRITER_EDIT = "/writer/edit",
}

export interface Messenger {
  readonly triggerMessage: (message: string) => void;
  readonly triggerAlert: (message: string) => void;
  readonly errorAlert: (err: ErrorResponse) => void;
}

export interface ErrorHandlerProps {
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
    if (alerts.length > 5) {
      deleteAlert(0);
    }
  };

  const triggerAlert = (message: string): void => {
    setAlerts((prev) => [
      ...prev,
      { visible: true, message: message, warn: true },
    ]);
    if (alerts.length > 5) {
      deleteAlert(0);
    }
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
    <>
      <Router>
        <NavBar />
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
          <Route path={Routes.PLAYER_PLAY} exact>
            <StoryPlayer message={message} />
          </Route>
          <Route path={Routes.WRITER_EDIT} exact>
            <WorkEditor message={message} />
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
    </>
  );
}

export default App;
