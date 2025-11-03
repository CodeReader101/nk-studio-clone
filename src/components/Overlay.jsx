import React from "react";

const Overlay = () => {
  return (
    <div className="h-screen w-screen fixed text-white flex justify-between">
      <div className="h-full w-[10%] border-r-[0.5px] border-white/5">
        <div className="text-4xl font-semibold m-7">
          <h2>
            <span className="text-primary">/</span>nk
          </h2>
        </div>
        <div className="fixed bottom-0 left-0 m-7"></div>
      </div>

      <div>
        <div className="fixed top-0 right-0 p-2 m-7 bg-blur rounded-lg text-[10px] ">
          <div className="flex">
            ENG <img className="w-3 pl-0.5" src="/svg/downArrow.svg" alt="" />
          </div>
        </div>

        <div className="fixed bottom-20 -right-5 -rotate-90 text-[10px]">
          SCROLL <span className="opacity-50">TO DISCOVER</span>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
