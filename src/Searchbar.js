import autoComplete from "@tarekraafat/autocomplete.js";

function Searchbar() {
  const autoCompleteJS = new autoComplete({
    data: {
      src: async () => {
        try {
          // Loading placeholder text
          document
            .getElementById("autoComplete")
            .setAttribute("placeholder", "Loading...");
          // Fetch External Data Source
          const source = await fetch(
            "https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json"
          );
          const data = await source.json();
          // Post Loading placeholder text
          document
            .getElementById("autoComplete")
            .setAttribute("placeholder", autoCompleteJS.placeHolder);
          // Returns Fetched data
          return data;
        } catch (error) {
          return error;
        }
      },
      keys: ["food", "cities", "animals"],
      cache: true,
      filter: (list) => {
        // Filter duplicates
        // incase of multiple data keys usage
        const filteredResults = Array.from(
          new Set(list.map((value) => value.match))
        ).map((food) => {
          return list.find((value) => value.match === food);
        });

        return filteredResults;
      },
    },
    placeHolder: "Search for Food & Drinks!",
    resultsList: {
      element: (list, data) => {
        const info = document.createElement("p");
        if (data.results.length > 0) {
          info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
        } else {
          info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
        }
        list.prepend(info);
      },
      noResults: true,
      maxResults: 15,
      tabSelect: true,
    },
    resultItem: {
      element: (item, data) => {
        // Modify Results Item Style
        item.style = "display: flex; justifyContent: spaceBetween;";
        // Modify Results Item Content
        item.innerHTML = `
            <span style="textOverflow: ellipsis; whiteSpace: nowrap; overflow: hidden;">
              ${data.match}
            </span>
            <span style="display: flex; alignItems: center; fontSize: 13px; fontWeight: 100; textTransform: uppercase; color: rgba(0,0,0,.2);">
              ${data.key}
            </span>`;
      },
      highlight: true,
    },
    events: {
      input: {
        focus: () => {
          if (autoCompleteJS.input.value.length) autoCompleteJS.start();
        },
      },
    },
  });

  // autoCompleteJS.input.addEventListener("init", function (event) {
  //   console.log(event);
  // });

  // autoCompleteJS.input.addEventListener("response", function (event) {
  //   console.log(event.detail);
  // });

  // autoCompleteJS.input.addEventListener("results", function (event) {
  //   console.log(event.detail);
  // });

  // autoCompleteJS.input.addEventListener("open", function (event) {
  //   console.log(event.detail);
  // });

  // autoCompleteJS.input.addEventListener("navigate", function (event) {
  //   console.log(event.detail);
  // });
  autoCompleteJS.input.addEventListener("selection", function (event) {
    const feedback = event.detail;
    autoCompleteJS.input.blur();
    // Prepare User's Selected Value
    const selection = feedback.selection.value[feedback.selection.key];
    // Render selected choice to selection div
    document.querySelector(".selection").innerHTML = selection;
    // Replace Input value with the selected value
    autoCompleteJS.input.value = selection;
    // Console log autoComplete data feedback
    console.log(feedback);
  });

  // autoCompleteJS.input.addEventListener("close", function (event) {
  //   console.log(event.detail);
  // });

  // Toggle Search Engine Type/Mode
  document.querySelector(".toggler").addEventListener("click", () => {
    // Holds the toggle button selection/alignment
    const toggle = document.querySelector(".toggle").style.justifyContent;

    if (toggle === "flex-start" || toggle === "") {
      // Set Search Engine mode to Loose
      document.querySelector(".toggle").style.justifyContent = "flex-end";
      document.querySelector(".toggler").innerHTML = "Loose";
      autoCompleteJS.searchEngine = "loose";
    } else {
      // Set Search Engine mode to Strict
      document.querySelector(".toggle").style.justifyContent = "flex-start";
      document.querySelector(".toggler").innerHTML = "Strict";
      autoCompleteJS.searchEngine = "strict";
    }
  });

  // Blur/unBlur page elements
  const action = (action) => {
    const title = document.querySelector("h1");
    const mode = document.querySelector(".mode");
    const selection = document.querySelector(".selection");
    const footer = document.querySelector(".footer");

    if (action === "dim") {
      title.style.opacity = 1;
      mode.style.opacity = 1;
      selection.style.opacity = 1;
    } else {
      title.style.opacity = 0.3;
      mode.style.opacity = 0.2;
      selection.style.opacity = 0.1;
    }
  };

  // Blur/unBlur page elements on input focus
  ["focus", "blur"].forEach((eventType) => {
    autoCompleteJS.input.addEventListener(eventType, () => {
      // Blur page elements
      if (eventType === "blur") {
        action("dim");
      } else if (eventType === "focus") {
        // unBlur page elements
        action("light");
      }
    });
  });

  return (
    <div className="container">
      <header className="header">
        <h1>
          <a
            href="https://tarekraafat.github.io/autoComplete.js/"
            target="_blank"
            rel="noreferrer"
          >
            autoComplete.js
          </a>
        </h1>
      </header>
      <div className="body" align="center">
        <div className="autoComplete_wrapper">
          <input id="autoComplete" type="text" tabindex="1" />
        </div>
        <div className="mode">
          <h4>mode</h4>
          <div className="toggle">
            <div className="toggler">Strict</div>
          </div>
        </div>
        <div className="selection"></div>
      </div>
    </div>
  );
}

export default Searchbar;
