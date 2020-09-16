import React, { useState } from "react";
import { MonetizationOn, LocalOffer } from "@material-ui/icons"; // importing the icons to make the textboxes look cool
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [percent, setPercent] = useState("");
  const [tip, setTip] = useState("");

  const calculateTip = (e) => {
    e.preventDefault();

    // adding checks to see if anything is entered
    if (!amount || !percent) {
      // return to stop execution of function immediately
      return toast.error("Please enter all the fields!", {
        transition: Flip,
        hideProgressBar: true,
      });
    }

    toast.success("Request sent!", {
      hideProgressBar: true,
      transition: Flip,
    });

    const data = {
      amount,
      tip: percent,
    };

    fetch("http://localhost:9000/api/v1/calculatetip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setTip(data.tobepayed));
  };

  return (
    // BEM Convention
    <div className="app">
      <div className="app__container">
        <div className="app__inputContainer">
          <MonetizationOn className="app__inputIcon" />
          <input
            type="text"
            value={amount}
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="app__inputContainer">
          <LocalOffer className="app__inputIcon" />
          <input
            type="text"
            value={percent}
            placeholder="Percentage"
            onChange={(e) => setPercent(e.target.value)}
          />
        </div>
        <button onClick={calculateTip} className="app__inputButton">
          Send
        </button>
        <h1>{tip}</h1>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
