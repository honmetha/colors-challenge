import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import * as React from "react";
import Axios from "axios";

interface IRgb {
  type: "rgb";
  red: number;
  green: number;
  blue: number;
}

interface IHsl {
  type: "hsl";
  hue: number;
  saturation: number;
  lightness: number;
}

const Home: NextPage = () => {
  const [colorSwatches, setColorSwatches] = React.useState<IRgb[] | IHsl[]>([]);

  const fetchColorSwatches = async () => {
    const newColors = await Axios.get(
      "http://localhost:8080/api/color-swatches"
    );
    setColorSwatches(newColors.data);
  };

  React.useEffect(() => {
    fetchColorSwatches();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Color Swatches</title>
        <meta name="description" content="Generate random color swatches" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <div className={styles.colorSwatches}>
            {colorSwatches.map((color, index) => (
              <div
                key={index}
                className={styles.color}
                style={{
                  backgroundColor:
                    color.type === "rgb"
                      ? `rgb(${color.red}, ${color.green}, ${color.blue})`
                      : `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
                }}
              />
            ))}
          </div>
          <div className={styles.buttonRow}>
            <button className={styles.button} onClick={fetchColorSwatches}>
              Regenerate Swatches
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
