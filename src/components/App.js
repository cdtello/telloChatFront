import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Room from "../pages/Room";
import NotFound from "../pages/NotFound";
import { UserContext } from "../states/user-context";

function App() {
  const [user, setUser] = useState(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/room" component={Room} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
