import React from "react";
import { HashRouter } from "react-router-dom";
import "antd/dist/antd.css";
import Routers from "./components/Routers";
import { AuthProvider } from "./components";
import { ReactQueryDevtools } from "react-query/devtools";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const App: React.FunctionComponent = ({ children }) => {
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <AuthProvider>
          <Routers />
        </AuthProvider>
      </QueryClientProvider>
    </HashRouter>
  );
};

export default App;
