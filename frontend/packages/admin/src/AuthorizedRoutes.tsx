import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import {
  CategoryIndex,
  CategoryForm,
  PostIndex,
  PostForm,
  PageIndex,
  PageForm,
} from "./pages";

import {
  CATEGORY_INDEX_ROUTE,
  CATEGORY_FORM_ROUTE,
  POST_INDEX_ROUTE,
  POST_FORM_ROUTE,
  PAGE_INDEX_ROUTE,
  PAGE_FORM_ROUTE,
} from "./config";

interface IAuthorizedRoutesProps {}

const AuthorizedRoutes: React.FunctionComponent<IAuthorizedRoutesProps> = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route exact path={CATEGORY_INDEX_ROUTE} component={CategoryIndex} />
      <Route exact path={CATEGORY_FORM_ROUTE} component={CategoryForm} />

      <Route exact path={POST_INDEX_ROUTE} component={PostIndex} />
      <Route exact path={POST_FORM_ROUTE} component={PostForm} />

      <Route exact path={PAGE_INDEX_ROUTE} component={PageIndex} />
      <Route exact path={PAGE_FORM_ROUTE} component={PageForm} />
    </Switch>
  );
};

export default AuthorizedRoutes;
