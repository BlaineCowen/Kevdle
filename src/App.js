import logo from './logo.svg';
import './App.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import commands from './commands.txt';
import {useState} from 'react';



function App() {

  const [kevCommands, setKevCommands] = useState(["fetching..."]);
  fetch(commands)
    .then(response => response.text())
    .then(text => {

      //get rid of the spaces in the text
      text = text.replace("\n", ' ').replace(/\s+/g, ' ').split(' ');;
      setKevCommands(text);
    })
    
  return (
    <main className='bg-custom-bg text-custom-fg overflow-auto flex flex-col'>
        <div className='flex-none'>
          <header className= "border-b border-custom-line">
            <div className='max-w-screen-mn mx-auto'>
              <div className="flex justify-evenly text-custom-fgcolor p-3 items-center">
                <div className="flex flex-1">
                  <button className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm svelte-1r54uzk">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </button>
                  <button className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm svelte-1r54uzk">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                </div>
                <h1 className="font-serif text-3xl font-bold flex-grow text-center flex-1">Kevdle</h1>
                <div className="flex flex-1 justify-end">
                  <button className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm svelte-1r54uzk">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 20v-6M6 20V10M18 20V4"></path>
                    </svg>
                  </button> 
                  <button className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm svelte-1r54uzk">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      </button>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="w-full flex flex-col flex-grow relative">
          <div className="max-w-screen-sm w-full mx-auto h-full flex flex-col justify-between overflow-auto">
            <div className="p-3 flex-col items-evenly">
              <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0 border-custom-line">
                <div className="w-5 h-5">
                </div> 
              </div>
                <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0">
                  <div className="w-5 h-5">
                  </div> 
                </div>
                  <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0">
                    <div className="w-5 h-5">
                    </div> 
                  </div>
                    <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0">
                      <div className="w-5 h-5">
                      </div>
                    </div>
                      <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0">
                        <div className="w-5 h-5">
                        </div> 
                      </div>
                        <div className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0">
                          <div className="w-5 h-5">
                          </div> 
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
                          options= {kevCommands}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="Search" />}
                        />
                          <div className="flex items-center">
                            <div>0:00</div>
                            </div> 
                            <div className="flex justify-center items-center p-1">
                              <button className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm svelte-1r54uzk">
                                <div className="flex justify-center items-center text-custom-fg h-14 w-14 border-2 rounded-full relative overflow-hidden">
                                  <div className="ml-1 relative z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokLinejoin="round">
                                      <polygon points="5 3 19 12 5 21 5 3">
                                        </polygon>
                                    </svg>
                                  </div>
                                </div>
                              </button>
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
                          <button className="px-2 py-2 uppercase tracking-widest bg-custom-mg border-none flex items-center font-semibold text-sm svelte-1r54uzk"> Skip 
                            <span className="tracking-normal lowercase">(+1s)</span>
                          </button> 
                          <button className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm svelte-1r54uzk bg-custom-positive">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
    </main>
  );
}



export default App;
