import { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

function LandingPage() {
  const [animateRedBlock, setAnimateRedBlock] = useState(false);

  useEffect(() => {
    // Déclenche l'animation après moins d'une seconde
    const timer = setTimeout(() => {
      setAnimateRedBlock(true);
    }, 850);

    return () => clearTimeout(timer); // Nettoie le timer au démontage
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-900 pt-1">
      <div className="textstructure font-founders text-[#e4e4dc] mt-44 px-20">
        {["Des clubs", "Un joueur", "Qui suis-je ?"].map((item, index) => (
          <div key={index} className="masker">
            <div className="w-fit flex items-end">
              {index === 1 && (
                <div className="flex items-end">
                  <div
                    className={`mr-2 mb-1 h-[7vw] relative top-[1.4vw] bg-red-500 rounded-full transition-all duration-700 ease-out ${
                      animateRedBlock ? "w-[14vw]" : "w-0"
                    }`}
                  ></div>
                  <h1 className="pt-[2vw] -mb-[1vw] uppercase text-[11vw] leading-[.75] font-bold font-founders transition-transform duration-700 ease-out">
                    {item}
                  </h1>
                </div>
              )}
              {index !== 1 && (
                <h1 className="pt-[2vw] -mb-[1vw] uppercase text-[11vw] leading-[.75] font-bold font-founders">
                  {item}
                </h1>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t-[1px] font-neue border-zinc-800 mt-20 flex justify-between items-center py-5 px-20">
        {[
          "For public and private companies",
          "From the first pitch to IPO",
        ].map((item, index) => (
          <p
            key={index}
            className="text-md font-light text-[#e4e4dc] tracking-tight leading-none"
          >
            {item}
          </p>
        ))}
        <div className="start flex items-center gap-5">
          <a
            href="#about"
            className="cursor-pointer px-5 py-2 border-[1px] text-[#e4e4dc] border-zinc-400 font-light text-md uppercase rounded-full flex items-center gap-2"
          >
            Start
            <span className="rotate-[45deg] text-[#e4e4dc]">
              <FaArrowUpLong />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
