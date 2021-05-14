import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "@dontloop/admin-ui";
import menuData from "../menu";
import { LOGO_PATH } from "../config";
import AuthorizedRoutes from "../AuthorizedRoutes";
import LoginPage from "../pages/LoginPage";

const Routers: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Layout
        showSidebar={true}
        logoPath={LOGO_PATH}
        menuData={menuData}
        routes={<AuthorizedRoutes />}
      />
    </Switch>
  );
};

export default Routers;
