import express from "express";
import cors from "cors"; // important because if not included, it will give wierd cors errors in frontend

const app = express();
const PORT = 9000; // port on which you want your backend to run

// instruct express to parse json data when recieved
app.use(express.json());
app.use(cors()); // actually bring the cors in action

// basic route to see if the api is working, when you go to http://localhost:9000/ you'll see Hello world
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

// actually processes the data sent from frontend and sends it back as json
app.post("/api/v1/calculatetip", (req, res) => {
  const amount = parseInt(req.body.amount); // parseInt() because recieved values are strings, so we need to convert to integers
  const tip = parseInt(req.body.tip);
  const tobepayed = amount * (tip / 100) + amount;
  res.status(200).json({ tobepayed });
});

// listen to port, this will actually bring your express server up and running
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
