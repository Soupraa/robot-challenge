import React from "react";
import ReactDOM from "react-dom";
import useFetch from "react-fetch-hook";
import Clientform from "./Clientform";

function App() {
  return <Clientform />;
}

ReactDOM.render(<App />, document.getElementById("app"));
