const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

const randomBetween = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));

const getRandomColor = {
  0: function get_random_color_rgb() {
    const red = randomBetween(0, 255);
    const green = randomBetween(0, 255);
    const blue = randomBetween(0, 255);
    return {
      type: "rgb",
      red,
      green,
      blue,
    };
  },
  1: function get_random_color_hsl() {
    const hue = randomBetween(1, 360);
    const saturation = randomBetween(0, 100);
    const lightness = randomBetween(0, 100);
    return {
      type: "hsl",
      hue,
      saturation,
      lightness,
    };
  },
};

app.get("/api/color-swatches", (req, res) => {
  const randomColorType = () => Math.round(Math.random());
  const colorSwatches = Array(5)
    .fill(undefined)
    .map(() => getRandomColor[randomColorType()]());
  res.status(200).send(colorSwatches);
});
