import axios from "axios";
import { Component } from "react";
import "./client.css";
/*Client POST form component for front end */
export default class Clientform extends Component {
  constructor() {
    super();
    this.state = {
      uniqueLocations: "searching...",
      p2uniqueLocations: "searching...",
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  /*to get response from API after sending instructions for both part 1 and part 2*/
  componentDidMount() {
    axios
      .get("http://localhost:4001/api/part1Answer")
      .then((response) => {
        this.setState({ uniqueLocations: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:4001/api/part2Answer")
      .then((response) => {
        this.setState({ p2uniqueLocations: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    /*function  to send post request to API */
    function handleSubmit() {
      const x = document.getElementById("instructions").value;
      const data = { x };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch("http://localhost:4001/api/part1", options).catch((error) => {
        console.log(error);
      });
      fetch("http://localhost:4001/api/part2", options).catch((error) => {
        console.log(error);
      });
    }
    return (
      <section class="clientPage">
        <h2>Robot Challenge</h2>
        <form classname="form" id="myForm" onSubmit={handleSubmit}>
          <h3>Send me instructions!</h3>
          <p>
            x = Take photo <pre />w = Move north &nbsp;&nbsp; a = Move west
            &nbsp;&nbsp; s = Move south &nbsp;&nbsp; d = Move east
          </p>
          <input
            class="text"
            type="text"
            name="instructions"
            id="instructions"
            pattern="^[wasdx]*$"
          />
          <br />
          <button class="submit" type="submit">
            send
          </button>
        </form>
        <h1>
          Total unique locations photographed with 1 robot:{" "}
          {this.state.uniqueLocations}{" "}
        </h1>
        <h1>
          Total unique locations photographed with 2 robots:{" "}
          {this.state.p2uniqueLocations}{" "}
        </h1>
        <p>Richard Gao: robot challenge submission.</p>
      </section>
    );
  }
}
