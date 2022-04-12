import "./App.css";
import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

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

function App() {
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
        setKevCommands(text);
      });
  }, []);

  return (
    <main className="bg-custom-bg text-custom-fg overflow-auto flex flex-col">
      <div className="flex-none">
        <header className="border-b border-custom-line">
          <div className="max-w-screen-mn mx-auto">
            <div className="flex justify-evenly text-custom-fgcolor p-3 items-center">
              <div className="flex flex-1">
                <IconButton>
                  <AiOutlineInfoCircle size="1.5em" color="black" />
                </IconButton>
                <IconButton>
                  <AiOutlineHeart size="1.5em" color="black" />
                </IconButton>
              </div>
              <h1 className="font-serif text-3xl font-bold flex-grow text-center flex-1">
                Kevdle
              </h1>
              <div className="flex flex-1 justify-end">
                <IconButton>
                  <IoMdStats size="1.5em" color="black" />
                </IconButton>
                <IconButton>
                  <AiOutlineQuestionCircle size="1.5em" color="black" />
                </IconButton>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="w-full flex flex-col flex-grow relative">
        <div className="max-w-screen-sm w-full mx-auto h-full flex flex-col justify-between overflow-auto">
          <div className="p-3 flex-col items-evenly">
            <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0 border-custom-line">
              <div className="w-5 h-5"></div>
            </div>
            <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0">
              <div className="w-5 h-5"></div>
            </div>
            <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0">
              <div className="w-5 h-5"></div>
            </div>
            <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0">
              <div className="w-5 h-5"></div>
            </div>
            <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0">
              <div className="w-5 h-5"></div>
            </div>
            <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0">
              <div className="w-5 h-5"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-custom-line">
        <div className="max-w-screen-sm w-full mx-auto flex-col">
          <div className="px-3 ">
            <div className="flex justify-between items-center">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={kevCommands}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search" />
                )}
              />
              <div className="flex items-center">
                <div>0:00</div>
              </div>
              <div className="flex justify-center items-center p-1">
                <IconButton onClick={toggle}>
                  {state ? (
                    <PlayCircle size="2em" color="black" />
                  ) : (
                    <Barchart size="2em"/>
                  )}
                </IconButton>
              </div>
              <div>0:16</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-sm w-full mx-auto flex-col">
        <div className="m-3 mt-0">
          <div>
            <div className="flex justify-between pt-3">
              <button className="px-2 py-2 uppercase tracking-widest bg-custom-mg border-none flex items-center font-semibold text-sm svelte-1r54uzk">
                {" "}
                Skip
                <span className="tracking-normal lowercase">(+1s)</span>
              </button>
              <button className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm svelte-1r54uzk bg-custom-positive">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
