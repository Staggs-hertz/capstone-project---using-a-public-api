import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await axios.get("https://api.animechan.io/v1/quotes/random");
  const data = result.data.data;
  try {
    res.render("index.ejs", {
      quote: data.content,
      speaker: data.character.name,
      english: data.anime.name,
      alt: data.anime.altName,
    })
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
