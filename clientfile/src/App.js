import React, { PureComponent } from "react";

import io from "socket.io-client";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import "./styles.css";

const socket = io("http://localhost:4000");

class App extends PureComponent {
  state = {
    count1: 1,
  };

  componentDidMount() {
    socket.on("new-data", (data) => {
      console.log("received data");
      console.log(data);
      this.setState({ count1: data.count1 });
    });

    // setTimeout(() => {
    //   console.log("emit running");
    //   socket.emit("data-sent", "1234");
    // }, 5000);
  }

  handleCount = (value) => {
    this.setState({ count1: value }, () => {
      socket.emit("data-sent", { count1: value });
    });
  };

  render() {
    let data1 = [
      {
        name: "xyz",
        y: 40,
      },
      {
        name: "abc",
        y: 20,
      },
      {
        name: "pqr",
        y: 10,
      },
      {
        name: "yeahhh",
        y: 61.41,
        sliced: true,
        selected: true,
      },
    ];
    const options = {
      title: {
        text: "My Chart",
      },
      series: [
        {
          type: "pie",
          data: data1,
        },
      ],
    };

    return (
      <div className="App">
        <HighchartsReact
          className="pie"
          highcharts={Highcharts}
          options={options}
        />{" "}
        <div>
          <Counter count={this.state.count1} setCount={this.handleCount} />
        </div>
      </div>
    );
  }
}

export default App;

const Counter = ({ count, setCount }) => {
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <span>{count}</span>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
};
