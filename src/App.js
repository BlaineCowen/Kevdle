import "./App.css";
import React from "react";

import {
  S3Client,
  S3,
  ListObjectsV2,
  ListObjectsV2Command,
  PutBucketCorsCommand,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createTheme } from "@mui/material/styles";
import {
  green,
  blue,
  red,
  purple,
  white,
  black,
  teal,
  orange,
  grey,
} from "@mui/material/colors";
import { OutlinedInput } from "@mui/material";

import {
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import RedEx from "./RedEx";

import { IoMdStats } from "react-icons/io";
import { BsPlayCircle } from "react-icons/bs";
import { useSpring, animated } from "react-spring";

import commands from "./commands.txt";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@mui/material";
import { render } from "@testing-library/react";
import Barchart from "./Barchart";

import PlayCircle from "./PlayCircle";
import { ThemeProvider } from "@emotion/react";
import { display, palette, style } from "@mui/system";
import { alpha, styled } from "@mui/material/styles";
import { appendOwnerState } from "@mui/base";
import EndScreen from "./EndScreen";
import ComboBox from "./demo";

function App() {
  const theme = createTheme({
    components: {
      // Name of the component
      MuiAutocomplete: {
        root: {
          // Name of the rule
          color: "red",
          text: "blue",
        },
      },

      MuiOutlinedInput: {
        // Name of the rule
        root: {
          // Styles for the rule
          borderColor: "red",
          color: "blue",
        },
      },
    },
    palette: {
      primary: {
        light: "#FFFFFF",
        main: grey[400],
        dark: "#000000",
        contrastText: "#fff",
      },
      secondary: {
        main: "#1D7E05",
        contrastText: "#fff",
      },
      text: {
        light: red[300],
        primary: grey[400],
        secondary: green[400],
        dark: purple[500],
      },
      warning: {
        main: grey[800],
        contrastText: "#fff",
      },
    },
  });

  const [state, setState] = useState(true);

  const toggle = () => {
    setState(!state);
    //wait for audio to finish
  };

  const playAudio = () => {
    newAudio.pause();
    newAudio.currentTime = 0;
    toggle();

    if (state) {
      newAudio.play();
      if (audioLength.current > 0) {
        newAudio.addEventListener("timeupdate", () => {
          if (newAudio.currentTime >= audioLength.current) {
            //end audio
            newAudio.currentTime = audioLength.current;
            newAudio.pause();
            //end event listener
            newAudio.removeEventListener("timeupdate", () => {});

            setState(state);
          }
          document.getElementById("playbar-foreground").style.width = `${
            (newAudio.currentTime / audioLength.current) * 100
          }%`;
          newAudio.removeEventListener("timeupdate", () => {});
        });
      }
      if (newAudio.duration >= 10) {
        document.getElementById(
          "total-time"
        ).innerHTML = `0:${newAudio.duration.toFixed(0)}`;
      } else {
        document.getElementById(
          "total-time"
        ).innerHTML = `0:0${newAudio.duration.toFixed(0)}`;
      }
    }
  };

  const [kevCommands, setKevCommands] = useState([""]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const [newAudio, setAudio] = useState(null);
  const [audioName, setAudioName] = useState("");
  const audioLength = useRef(null);
  const songLengthArray = [12.5, 25, 40, 60, 80, 100, 100];

  useEffect(() => {
    const bucket = "kevdle-test";
    const url = `https://storage.googleapis.com/storage/v1/b/${bucket}/o`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        const objects = response.items.map((item) =>
          item.name.replace(".mp3", "")
        );
        const randomItem = objects[Math.floor(Math.random() * objects.length)];
        console.log(`${randomItem}.mp3`);
        setAudioName(randomItem);

        setKevCommands(objects);

        const audioUrl = `https://storage.googleapis.com/kevdle-test/${randomItem}.mp3`;
        setAudio(new Audio(audioUrl));
      });
  }, []);

  const [guesses, setGuesses] = useState([]);
  const [tries, setTries] = useState(0);
  const [win, setWin] = useState(false);
  const [tryLog, setTryLog] = useState(["◾", "◾", "◾", "◾", "◾"]);

  useEffect(() => {
    if (tries > 0) {
      if (win === true) {
        document.getElementById("playbar-background").style.width = `${100}%`;
      } else {
        document.getElementById(
          "playbar-background"
        ).style.width = `${songLengthArray[tries]}%`;
      }
    }
  }, [tries, win]);

  const loseGame = () => {
    if (tries >= 5) {
      //end game
      document.getElementById("win-text").innerHTML = "You Lose Ya Dingus!";
      document.getElementById("win-text").style.color = "red";
      document.getElementById("try-text").innerHTML = "";
      document.getElementById("end-screen").style.display = "flex";

      document.getElementById("guess-boxes").style.display = "none";

      audioLength.current = newAudio.duration;
      document.getElementById("playbar-limit").style.width = `${100}%`;
      setTries(5);

      playAudio();
    }
  };

  const userSubmit = () => {
    const guess = document.getElementById("combo-box-demo").value;
    setGuesses([...guesses, guess]);
    //add to tries
    loseGame();

    if (guess === audioName) {
      const tempTryLog = [...tryLog];
      tempTryLog[tries] = "🟩";
      setTryLog(tempTryLog);
      setWin(true);
      setTries(tries + 1);
      newTry();
      console.log("correct");
      //make a window appear that says correct
      document.getElementById("end-screen").style.display = "flex";

      document.getElementById("guess-boxes").style.display = "none";
      audioLength.current = newAudio.duration;
      document.getElementById("playbar-limit").style.width = `${100}%`;

      playAudio();
    } else {
      //change tryLog[tries] to "🟥"
      const tempTryLog = [...tryLog];
      tempTryLog[tries] = "🟥";
      setTryLog(tempTryLog);

      const tempTries = tries + 1;
      setTries(tries + 1);
      newTry();
      console.log("incorrect");
      //make guess box (tries) visible
      document.getElementById(`guess-${tempTries}-box`).style.display = "flex";
      document.getElementById(`guess-${tempTries}-text`).innerHTML = guess;
    }
  };

  const skip = () => {
    //change tryLog[tries] to "⬜"
    if (tries < 5) {
      const tempTryLog = [...tryLog];
      tempTryLog[tries] = "⬜";
      setTryLog(tempTryLog);

      setTries(tries + 1);
      newTry();
      const tempTries = tries + 1;
      document.getElementById(`guess-${tempTries}-box-skip`).style.display =
        "flex";
    } else {
      loseGame();
    }
  };

  const newTry = () => {
    audioLength.current =
      newAudio.duration * (songLengthArray[tries + 1] / 100);
    console.log(`you are on your ${tries + 1} try`);
    newAudio.currentTime = 0;
    document.getElementById("playbar-limit").style.width = `${
      songLengthArray[tries + 1]
    }%`;
  };

  useEffect(() => {
    if (newAudio) {
      if (tries === 0) {
        newAudio.addEventListener("loadedmetadata", () => {
          audioLength.current =
            newAudio.duration * (songLengthArray[tries] / 100);
          console.log(
            `new audio set audio length ${
              newAudio.duration * (songLengthArray[tries] / 100)
            }`
          );
        });
      }
    }
  }, [newAudio]);

  useEffect(() => {
    if (newAudio) {
      newAudio.addEventListener("timeupdate", () => {
        if (newAudio.currentTime < 10) {
          document.getElementById(
            "current-time"
          ).innerHTML = `0:0${newAudio.currentTime.toFixed(0)}`;
        } else {
          document.getElementById(
            "current-time"
          ).innerHTML = `0:${newAudio.currentTime.toFixed(0)}`;
        }
      });

      newAudio.onended = () => {
        setState(state);
      };
    }
  }, [newAudio]);

  return (
    <main className="bg-black text-red-fg overflow-auto flex flex-col h-screen">
      <div className="flex-none bg-black">
        <header className="border-b border-gray">
          <div className="max-w-screen-mn mx-auto">
            <div className="flex justify-evenly text-custom-fgcolor p-3 items-center">
              <div className="flex flex-1">
                <IconButton>
                  <AiOutlineHeart size="1.5em" color="white" />
                </IconButton>
                <IconButton>
                  <AiOutlineInfoCircle size="1.5em" color="white" />
                </IconButton>
              </div>
              <h1 className="font-serif text-3xl font-bold flex-grow text-center flex-1 text-white">
                Kevdle
              </h1>
              <div className="flex flex-1 justify-end">
                <IconButton>
                  <IoMdStats size="1.5em" color="white" />
                </IconButton>
                <IconButton>
                  <AiOutlineQuestionCircle size="1.5em" color="white" />
                </IconButton>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div
        id="guess-boxes"
        className="w-full h-full flex flex-col flex-grow relative"
      >
        <div className="max-w-screen-sm w-full mx-auto h-full flex flex-col justify-between overflow-auto">
          <div className="p-3 flex-col items-evenly">
            <div className="p-2 mb-2 h-10 border border-gray flex items-center last:mb-0 border-y1-2">
              <div id="guess-1-box" style={{ display: "none" }}>
                <div className="mr-2">
                  <RedEx />
                </div>
                <div className="flex flex-1 justify-between items-center">
                  <div id="guess-1-text" className="text-white text-small">
                    TEST
                  </div>
                </div>
              </div>
              <div id="guess-1-box-skip" style={{ display: "none" }}>
                <div className="mr-2 w-5 h-5 border-2  border-gray"></div>
                <div className="flex flex-1 justify-between items-center">
                  <div className="text-gray text-small">SKIPPED</div>
                </div>
              </div>
            </div>
            <div className="p-2 mb-2 h-10 border border-gray flex items-center last:mb-0 border-y1-2">
              <div id="guess-2-box" style={{ display: "none" }}>
                <div className="mr-2">
                  <RedEx />
                </div>
                <div className="flex flex-1 justify-between items-center">
                  <div id="guess-2-text" className="text-white text-small">
                    TEST
                  </div>
                </div>
              </div>
              <div id="guess-2-box-skip" style={{ display: "none" }}>
                <div className="mr-2 w-5 h-5 border-2  border-gray"></div>
                <div className="flex flex-1 justify-between items-center">
                  <div className="text-gray text-small">SKIPPED</div>
                </div>
              </div>
            </div>
            <div className="p-2 mb-2 h-10 border border-gray flex items-center last:mb-0 border-y1-2">
              <div id="guess-3-box" style={{ display: "none" }}>
                <div className="mr-2">
                  <RedEx />
                </div>
                <div className="flex flex-1 justify-between items-center">
                  <div id="guess-3-text" className="text-white text-small">
                    TEST
                  </div>
                </div>
              </div>
              <div id="guess-3-box-skip" style={{ display: "none" }}>
                <div className="mr-2 w-5 h-5 border-2  border-gray"></div>
                <div className="flex flex-1 justify-between items-center">
                  <div className="text-gray text-small">SKIPPED</div>
                </div>
              </div>
            </div>
            <div className="p-2 mb-2 h-10 border border-gray flex items-center last:mb-0 border-y1-2">
              <div id="guess-4-box" style={{ display: "none" }}>
                <div className="mr-2">
                  <RedEx />
                </div>
                <div className="flex flex-1 justify-between items-center">
                  <div id="guess-4-text" className="text-white text-small">
                    TEST
                  </div>
                </div>
              </div>
              <div id="guess-4-box-skip" style={{ display: "none" }}>
                <div className="mr-2 w-5 h-5 border-2  border-gray"></div>
                <div className="flex flex-1 justify-between items-center">
                  <div className="text-gray text-small">SKIPPED</div>
                </div>
              </div>
            </div>
            <div className="p-2 mb-2 h-10 border border-gray flex items-center last:mb-0 border-y1-2">
              <div id="guess-5-box" style={{ display: "none" }}>
                <div className="mr-2">
                  <RedEx />
                </div>
                <div className="flex flex-1 justify-between items-center">
                  <div id="guess-5-text" className="text-white text-small">
                    TEST
                  </div>
                </div>
              </div>
              <div id="guess-5-box-skip" style={{ display: "none" }}>
                <div className="mr-2 w-5 h-5 border-2  border-gray"></div>
                <div className="flex flex-1 justify-between items-center">
                  <div className="text-gray text-small">SKIPPED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EndScreen
        data1={tries}
        data2={audioName}
        data3={theme}
        data4={tryLog.join(" ")}
      />

      <div className="inset-x-0 bottom-0 border-t border-custom-line border-gray">
        <div className="max-w-screen-sm w-full mx-auto flex-col px-3">
          <div id="playbar-container" className="h-3 relative">
            {/* vertical lines */}

            <div
              id="playbar-background"
              className="w-full h-3 bg-gray absolute"
              style={{ width: "12.5%" }}
            ></div>

            <div
              id="playbar-limit"
              className="w-full h-3 absolute"
              style={{ width: "12.5%" }}
            >
              <div
                id="playbar-foreground"
                className="w-full h-3 bg-green absolute"
                style={{ width: "0%" }}
              ></div>
            </div>

            <div id="vertical-line-container" className="h-3 w-full absolute">
              <div className="w-full flex max-h-3 ">
                <div
                  id="vertical lines"
                  className="border-x border-gray h-3 inline-block"
                  style={{ width: "12.5%" }}
                ></div>
                <div
                  id="vertical lines"
                  className="border-r border-gray h-3 inline-block"
                  style={{ width: "12.5%" }}
                ></div>
                <div
                  id="vertical lines"
                  className="border-r border-gray h-3 inline-block"
                  style={{ width: "15%" }}
                ></div>
                <div
                  id="vertical lines"
                  className="border-r border-gray h-3 inline-block"
                  style={{ width: "20%" }}
                ></div>
                <div
                  id="vertical lines"
                  className="border-r border-gray h-3 inline-block"
                  style={{ width: "20%" }}
                ></div>
                <div
                  id="vertical lines"
                  className="border-r border-gray h-3 inline-block"
                  style={{ width: "20%" }}
                ></div>
                {/* <div
                  id="vertical lines"
                  className="border-r border-gray h-3 inline-block"
                  style={{ width: "20%" }}
                ></div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-custom-line border-gray min-h-min">
          <div className="max-w-screen-sm w-full mx-auto flex-col">
            <div className="px-3 ">
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center">
                  <div id="current-time" className="min-w-5">
                    0:00
                  </div>
                </div>
                <div className="flex justify-center items-center p-1">
                  <IconButton id="play-button" onClick={playAudio}>
                    {state ? (
                      <PlayCircle size="2em" color="white" />
                    ) : (
                      <Barchart size="2em" color="white" />
                    )}
                  </IconButton>
                </div>
                <div id="total-time">0:00</div>
              </div>
              <ComboBox />
            </div>
          </div>
        </div>
        <div className="max-w-screen-sm w-full mx-auto flex-col">
          <div className="m-3 mt-0">
            <div>
              <div className="flex justify-between pt-3">
                <ThemeProvider theme={theme}>
                  <Button onClick={skip} variant="contained" color="warning">
                    Skip
                    <span className="tracking-normal lowercase">
                      (+
                      {(
                        songLengthArray[tries + 1] - songLengthArray[tries]
                      ).toFixed(1)}
                      %)
                    </span>
                  </Button>
                  <Button
                    onClick={userSubmit}
                    variant="contained"
                    color="secondary"
                  >
                    Submit
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
