import PropTypes from "prop-types";
import ImageFoot from "../assets/ImageFoot.webp";

function About({ onStartQuiz }) {
  return (
    <div
      id="about"
      className="w-full p-20 bg-[#CDEA68] rounded-tl-3xl rounded-tr-3xl text-black"
    >
      <h1 className="font-neue text-[4vw] leading-[4.5vw] tracking-tight mb-10 animate-slideIn">
        Montre que tu es une pointure en Football. Le but est simple : deviner
        un joueur en fonction des clubs dans lesquels il a évolué.
      </h1>
      <div className="w-full border-t-[1px] pt-10 mt-20 border-[#A1B562]">
        <div className="flex gap-5">
          <div className="w-1/2 h-[70vh] rounded-3xl">
            <h1 className="font-founders text-7xl pb-2 inline-block animate-slideInTitle">
              À toi de jouer :
            </h1>
            <button
              onClick={onStartQuiz} // Appel de onStartQuiz pour démarrer le quiz
              className="relative group flex uppercase gap-10 items-center px-10 py-6 bg-zinc-900 mt-10 rounded-full text-white transform transition-transform duration-300 ease-out hover:scale-105 hover:bg-black animate-pulse"
            >
              Let&apos;s play
              <div className="relative w-2 h-2 bg-zinc-100 rounded-full transition-all duration-300 ease-out group-hover:bg-transparent">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
              </div>
            </button>
          </div>
          <div
            className="w-[41%] h-[73vh] rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${ImageFoot})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Ajout de la validation des props
About.propTypes = {
  onStartQuiz: PropTypes.func.isRequired,
};

export default About;
