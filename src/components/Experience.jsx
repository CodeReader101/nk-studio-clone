import React from "react";

const Experience = () => {
  return (
    <>
      <div className="text-white flex justify-end small-text mt-50">
        <div className="w-[60%]">
          <div className="w-[80%]">
            <h2 className="text-5xl">
              We create experiences that ignite passion by reimagining what's
              possible
            </h2>
          </div>

          <div className="grid grid-cols-[1fr_2fr] w-[80%] gap-8 mt-10">
            <p className="font-semibold col-start-1">
              From the end of the world 🇦🇷 to our galaxy far far away…
            </p>
            <p className="col-start-2">
              For over 19 years, we've worked alongside startups and leading
              companies to rediscover their essence their essence and stand out.
              Through collaboration, creatitivity, and technology, we craft work
              that connects, resonates, and drives real impact on people and on
              results.
            </p>
          </div>
          {/* grid-rows-[20px_20px_20px_] */}
          <div className="grid grid-cols-4 gap-4 w-[80%]  grid-rows-[20px_20px_20px_10rem_1rem] mt-16">
            <div className="flex flex-col bg-blur rounded-lg justify-between p-4 h-50 col-start-1">
              <span className="text-5xl">
                200 <span className="text-sm">+</span>
              </span>
              <span>
                universe created <span>*or maybe more</span>
              </span>
            </div>

            <div className="flex flex-col bg-blur rounded-lg justify-between h-50 p-4 row-start-3 col-start-2">
              <span className="text-5xl">
                12 <span className="text-sm">weeks</span>
              </span>
              <span>average time to turn ideas into realities.</span>
            </div>

            <div className="flex flex-col bg-blur rounded-lg justify-between h-50 p-4 row-start-2 col-start-3">
              <span className="text-5xl">
                97 <span className="text-sm">%</span>
              </span>
              <span>clients trust us for their next project.</span>
            </div>

            <div className="flex flex-col bg-blur rounded-lg justify-between h-50 p-4 col-start-4">
              <span className="text-5xl">5</span>
              <span>
                continents <span>(until we discover more)</span>
              </span>
            </div>

            <div className="flex flex-col bg-blur rounded-lg justify-between h-50 p-4 row-start-5 col-start-1">
              <span className="text-5xl">
                <span className="text-sm">x</span>10
              </span>
              <span>
                boosts in visits, connecting brands with a global audience
              </span>
            </div>

            <div className="flex flex-col bg-blur rounded-lg h-40 justify-between p-4 col-end-4 row-start-5 col-start-2">
              <span className="text-5xl">
                150<span className="text-sm">+</span>
              </span>

              <span>
                Awards, <span>making us</span>
                <span> LATAM's most awarded studio</span>
              </span>
            </div>

            <div className="flex flex-col bg-blur rounded-lg justify-between p-4 row-start-5 h-50 col-start-4">
              <span className="text-5xl">
                6<span className="text-sm">+ years</span>
              </span>

              <span>
                team turnover<span> because we value our talent</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-screen mt-40 grid grid-cols-2">
        <div className="flex justify-center items-center ">
          <h2 className="text-4xl text-white w-80">
            For crafting bold digital realities, creativity knows no limits.
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-white/80 w-80">
            Every project is an opportunity to explore, innovate, and create
            meaningful connections.
          </p>
        </div>
      </div>
    </>
  );
};

export default Experience;
