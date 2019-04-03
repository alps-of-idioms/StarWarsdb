import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
/* import App from "./components/modal"; */
const rootEl = document.getElementById("root");

ReactDOM.render(<App />, rootEl);

if (module.hot) {
  module.hot.accept("./components/app", () => {
    const NextApp = require("./components/app").default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
