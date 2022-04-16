import "./App.css";
import React from "react";

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
import { IoMdStats } from "react-icons/io";
import { BsPlayCircle } from "react-icons/bs";
import { useSpring, animated } from "react-spring";

import commands from "./commands.txt";

import { useState, useEffect } from "react";
import { Icon } from "@mui/material";
import { render } from "@testing-library/react";
import Barchart from "./Barchart";

import PlayCircle from "./PlayCircle";
import { ThemeProvider } from "@emotion/react";
import { palette } from "@mui/system";
import { alpha, styled } from "@mui/material/styles";

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

  const CssTextField = styled(TextField)({
    "& label.Mui-Input": {
      color: "primary",
    },
    "& label.Mui-focused": {
      color: "primary",
    },
    "& label.Mui-active": {
      color: "primary",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "red",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  });

  const [state, setState] = useState({ false: "false" });

  const toggle = () => {
    setState(!state);
  };

  const [kevCommands, setKevCommands] = useState(["fetching"]);

  useEffect(() => {
    fetch(commands)
      .then((response) => response.text())
      .then((text) => {
        //get rid of the spaces in the text
        text = text.replace("\n", " ").replace(/\s+/g, " ").split(" ");
        //sort
        text.sort();
        setKevCommands(text);
      });
  }, []);

  return (
    <main className="bg-black text-red-fg overflow-auto flex flex-col h-screen">
      <div className="flex-none bg-black">
        <header className="border-b border-gray">
          <div className="max-w-screen-mn mx-auto">
            <div className="flex justify-evenly text-custom-fgcolor p-3 items-center">
              <div className="flex flex-1">
                <IconButton>
                  <AiOutlineInfoCircle size="1.5em" color="white" />
                </IconButton>
                <IconButton>
                  <AiOutlineHeart size="1.5em" color="white" />
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
      <div className="w-full h-full flex flex-col flex-grow relative">
        <div className="max-w-screen-sm w-full mx-auto h-full flex flex-col justify-between overflow-auto">
          <div className="p-3 flex-col items-evenly">
            <div className="p-2 mb-2 border border-gray flex items-center last:mb-0 border-y1-2">
              <div className="w-5 h-5"></div>
            </div>
            <div className="p-2 mb-2 border border-gray flex items-center last:mb-0">
              <div className="w-5 h-5"></div>
            </div>
            <div className="p-2 mb-2 border border-gray flex items-center last:mb-0">
              <div className="w-5 h-5"></div>
            </div>
            <div className="p-2 mb-2 border border-gray flex items-center last:mb-0">
              <div className="w-5 h-5"></div>
            </div>
            <div className="p-2 mb-2 border border-gray flex items-center last:mb-0">
              <div className="w-5 h-5"></div>
            </div>
            <div className="p-2 mb-2 border border-gray flex items-center last:mb-0">
              <div className="w-5 h-5"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="inset-x-0 bottom-0">
        <div className="border-t border-custom-line border-gray min-h-min">
          <div className="max-w-screen-sm w-full mx-auto flex-col">
            <div className="px-3 ">
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center">
                  <div>0:00</div>
                </div>
                <div className="flex justify-center items-center p-1">
                  <IconButton onClick={toggle}>
                    {state ? (
                      <PlayCircle size="2em" color="white" />
                    ) : (
                      <Barchart size="2em" />
                    )}
                  </IconButton>
                </div>
                <div>0:16</div>
              </div>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={kevCommands}
                getOptionLabel={(option) => option}
                sx={{
                  width: "100%",
                  color: "primary",
                  textColor: "primary",
                }}
                renderInput={(params) => (
                  <ThemeProvider theme={theme}>
                    <CssTextField
                      {...params}
                      label="Search"
                      variant="outlined"
                      sx={{
                        borderColor: "primary",
                        color: "secondary",
                      }}
                    />
                  </ThemeProvider>
                )}
              />
            </div>
          </div>
        </div>
        <div className="max-w-screen-sm w-full mx-auto flex-col">
          <div className="m-3 mt-0">
            <div>
              <div className="flex justify-between pt-3">
                <ThemeProvider theme={theme}>
                  <Button variant="contained" color="warning">
                    Skip
                    <span className="tracking-normal lowercase">(+1s)</span>
                  </Button>
                  <Button variant="contained" color="secondary">
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
