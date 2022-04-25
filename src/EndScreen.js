import { Button, TextField } from "@mui/material";
import { render } from "@testing-library/react";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { FiShare2 } from "react-icons/fi";
import { useSpring } from "react-spring";

function EndScreen(props) {
  const [cliboardCard, setCliboardCard] = useState("hidden");
  const [fade, setFade] = useState(false);

  const clipboardWin = () => {
    const date = new Date();
    const dateString = date.toLocaleDateString();

    const text = `Kevdle ${dateString} \n${props.data4}`;
    //copy text to clipboard
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    setCliboardCard("flex");
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 1000);
  };

  return (
    <div
      id="end-screen"
      className="w-full h-full flex flex-col flex-grow relative"
      style={{ display: "none" }}
    >
      <div className="max-w-screen-sm w-full mx-auto h-full flex flex-col justify-between overflow-auto">
        <div className="m-6 h-full  text-white border border-gray">
          {/* make a centered span with vertically aligned text */}
          <div className="flex flex-col relative items-center justify-center h-full">
            <span
              id="win-text"
              className="text-custom-fgcolor text-4xl  font-serif"
            >
              You Win!
            </span>
            <span
              id="try-text"
              className="text-custom-fgcolor text-2xl  text-center font-serif"
            >
              It only took you {props.data1} tries!
            </span>
            <span className="text-custom-fgcolor text-2xl text-center font-serif">
              The audio was "{props.data2}"
            </span>
            <span className="border border-gray text-slate rounded-sm p-4 mb-2  text-2xl text-center font-serif">
              {props.data4}
            </span>

            <ThemeProvider theme={props.data3}>
              <Button
                onClick={clipboardWin}
                variant="contained"
                color="secondary"
              >
                Share
                <FiShare2 className="ml-2" />
              </Button>
            </ThemeProvider>
            <div
              id="copied"
              className={`"flex flex-col inset-x-0 bottom-10 mt-4 items-center justify-center" transition-all duration-200 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="shadow-sm shadow-gray p-2 text-sm border border-gray rounded-sm font-serif">
                copied to clipboard!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndScreen;
