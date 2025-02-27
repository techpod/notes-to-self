import React from "react";
import ReactDOM from "react-dom/client";
/*added*/
import { Authenticator } from '@aws-amplify/ui-react';
/*end added*/
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
/*added*/
import '@aws-amplify/ui-react/styles.css';
/*end added*/

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  /*
  <React.StrictMode>
    <App />
  </React.StrictMode>
  */
  /*added*/
  <React.StrictMode>
  <Authenticator>
    <App />
  </Authenticator>
  </React.StrictMode>
  /*end added*/
);
