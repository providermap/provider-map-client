import React from "react";
import ReactDOM from "react-dom";

// Initialize firebase
import "./firebase";

// Initialize lunar
import Core from "@airbnb/lunar";

Core.initialize({
  defaultLocale: "en",
  defaultTimezone: "UTC",
  // logger: logToSentry,
  name: "ProviderMap",
});

// Application
import App from "./app";

ReactDOM.render(<App />, document.getElementById("app"));