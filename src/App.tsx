import { Fragment, useState } from "react";
import Button from "./components/Button";
import { Routes, Route, useNavigate } from "react-router-dom";
import Forms from "./modules/Forms";
import SnapForm from "./modules/SnapForm";
import Horizon from "./modules/Horizon";
import HorizonSnap from "./modules/HorizonSnap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Listbox, Transition } from "@headlessui/react";
import arrowDown from "/arrowDownBlack.svg";
import arrowUp from "/arrowUp.svg";

const navs = [
  { name: "Horizontal Carousel", href: "/horizon" },
  { name: "Horizontal Snap Scroll", href: "/horizonsnap" },
  { name: "Vertical Carousel", href: "/forms" },
  { name: "Vertical Snap Scroll", href: "/snapforms" },
];

function App() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(navs[0]);

  console.log(selected);

  const handleRoute = (selected: any) => {
    setSelected(selected);
    navigate(selected.href);
    window.scrollTo(0, 0);
  };

  return (
    <div className="">
      <header className="fixed top-0 z-[2] left-0 float-left w-screen px-4">
        <div className="py-4 border-b border-[#D7D6D6]">
          <Listbox value={selected} onChange={handleRoute}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <img src={arrowDown} className="h-4 w-4" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {navs.map((nav, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={nav}
                    >
                      {({ selected }) => (
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {nav.name}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </header>
      <Routes>
        <Route path="/forms" element={<Forms />} />
        <Route path="/snapforms" element={<SnapForm />} />
        <Route path="/horizon" element={<Horizon />} />
        <Route path="/horizonsnap" element={<HorizonSnap />} />
      </Routes>
    </div>
  );
}

export default App;
