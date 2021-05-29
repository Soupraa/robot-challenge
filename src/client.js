import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import useFetch from "react-fetch-hook";

/*method to send data to backend API*/
function handleSubmit() { 
  const x = document.getElementById("instructions").value;
  const data ={x};

  const s = JSON.stringify(x);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:4001/api', options).then(response => {
        console.log(response);
    });
}

/*tmp method to retreive data from backend API*/
function getData(){
   axios.get('http://localhost:4001/api/answer').then(function(response){
       console.log("Client log");
       console.log(response.data);
   });
}
function App() {
  // const {isLoading, data} = useFetch('http://localhost:4001');
  // if(isLoading) {
  //     return 'Loading...';
  // }
  return (
    <div>
      <h2>Robot Challenge</h2>
      <form classname="form" id="myForm" onSubmit={handleSubmit}>
        <label>Instructions:</label>
        <input type="text" name="instructions" id="instructions" />
        <button type="submit" onclick="handleSubmit()">
          submit
        </button>
       
      </form>
    <button onClick={getData}>click me</button>
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
