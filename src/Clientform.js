import axios from "axios";
import { Component } from "react";
import "./client.css";
/*Client POST form component for front end */
export default class Clientform extends Component {
  constructor() {
    super();
    this.state = {
      uniqueLocations: "not found yet",
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  /*to get response from API after sending instructions */
  componentDidMount() {
    axios.get("http://localhost:4001/api/answer").then((response) => {
      this.setState({ uniqueLocations: response.data });
    });
  }

  render() {
    /*function  to send post request to API */
    function handleSubmit() {
      const x = document.getElementById("instructions").value;
      const data = { x };

      const s = JSON.stringify(x);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch("http://localhost:4001/api", options).then((response) => {
        console.log(response);
      });
    }
    return (
      <section class="clientPage">
        <h2>Robot Challenge</h2>
        <form classname="form" id="myForm" onSubmit={handleSubmit}>
          <h3>Send me instructions!</h3>
          <input
            class="text"
            type="text"
            name="instructions"
            id="instructions"
          />
          <br />
          <button class="submit" type="submit" onclick="handleSubmit()">
            submit
          </button>
        </form>
        <h1>
          Total unique locations photographed: {this.state.uniqueLocations}{" "}
        </h1>
        {/* <button onClick={getData}>click me</button> */}
        {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      </section>
    );
  }
}
