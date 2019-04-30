import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import Routes from './Routes';
import { makeMainRoutes } from './routes';
import registerServiceWorker from "./registerServiceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));


const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
registerServiceWorker();

// ReactDOM.render(<Routes />, document.getElementById('root'));
// registerServiceWorker();
