import React, { useState } from "react";
import { MonetizationOn, LocalOffer } from "@material-ui/icons"; // importing the icons to make the textboxes look cool
import { ToastContainer, toast, Flip } from "react-toastify"; // used to make toasts (notifications)
import "react-toastify/dist/ReactToastify.css"; // requirement for react-toastify
import "./App.css";

function App() {
  // setting the states so that we could store the form values here
  const [amount, setAmount] = useState("");
  const [percent, setPercent] = useState("");
  const [tip, setTip] = useState("");

  // function fired off after click Send button (onClick method)
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

    // send out a success notification on the screen
    toast.success("Request sent!", {
      hideProgressBar: true,
      transition: Flip,
    });

    // prepare the data to be sent in a object
    const data = {
      amount,
      tip: percent,
    };

    // initialize the HTTP request to our express server
    fetch("http://localhost:9000/api/v1/calculatetip", {
      method: "POST", // because the method of this route in express is POST
      headers: {
        "Content-Type": "application/json", // IMPORTANT: if you miss this, fetch api will not know you're sending JSON data
      },
      body: JSON.stringify(data), // stringify converts the data object we made before into JSON string, which can be parsed on backend
    })
      .then((res) => {
        // tell fetch api that response recieved is of type json and parses it and stored as object
        return res.json();
      })
      .then((data) => setTip(data.tobepayed)); // set the tip so that it will re render and you could see response on screen
  };

  return (
    // BEM Convention
    <div className="app">
      <div className="app__container">
        <div className="app__inputContainer">
          <MonetizationOn className="app__inputIcon" />
          {/* We have value and onChange because onChange changes the value of the state and the value shows the value stored in state, it works in both sides */}
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
        {/* Fire off the function to contact the backend */}
        <button onClick={calculateTip} className="app__inputButton">
          Send
        </button>
        <h1>{tip}</h1>
      </div>
      {/* This component is from react-toastify which helps to actually render out notifications on screen, always recommend to place this at bottom */}
      <ToastContainer />
    </div>
  );
}

export default App;
