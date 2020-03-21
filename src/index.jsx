import React from "react";
import ReactDOM from "react-dom";
import Core from "@airbnb/lunar";

Core.initialize({
  defaultLocale: "en",
  defaultTimezone: "UTC",
  // logger: logToSentry,
  name: "AppName",
});

// Application
import App from "./app";

ReactDOM.render(<App />, document.getElementById("app"));