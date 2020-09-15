import express from "express";
import cors from "cors";

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.post("/api/v1/calculatetip", (req, res) => {
  const amount = parseInt(req.body.amount);
  const tip = parseInt(req.body.tip);
  const tobepayed = amount * (tip / 100) + amount;
  res.status(200).json({ tobepayed });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
