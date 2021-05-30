import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import useFetch from "react-fetch-hook";
import Clientform from "./Clientform";

/*tmp method to retreive data from backend API*/
// function getData() {
//   axios.get("http://localhost:4001/api/answer").then(function(response) {
//     console.log("Client log");
//     console.log(response.data);
//   });
// }
function App() {
  // const {isLoading, data} = useFetch('http://localhost:4001');
  // if(isLoading) {
  //     return 'Loading...';
  // }
  return <Clientform />;
}

ReactDOM.render(<App />, document.getElementById("app"));
