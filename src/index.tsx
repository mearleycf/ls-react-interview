import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./features/App/App";
import "./index.scss";

const queryClient = new QueryClient();

const AppContainer = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

ReactDOM.render(<AppContainer />, document.getElementById("root"));

export default AppContainer;
