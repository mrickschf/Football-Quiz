import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Navbar({ onStartQuiz }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Fonction pour revenir à la page d'accueil
  const goToHome = () => {
    window.location.reload(); // recharge la page pour revenir à la section d'accueil
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full px-20 py-1 shadow-md z-50 font-neue flex justify-between items-center backdrop-blur-md bg-zinc-500 bg-opacity-10 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="logo w-20 rounded cursor-pointer" onClick={goToHome}>
        <img src="/FootballQuizLogo.webp" alt="logo" />
      </div>
      <div className="cursor-pointer links flex gap-10 capitalize">
        <a href="#about" className="text-md font-light text-[#e4e4dc]">
          Let&apos;s play
        </a>
        <a href="#login" className="text-md font-light text-[#e4e4dc]">
          Login
        </a>
        <a href="#ranked" className="text-md font-light text-[#e4e4dc]">
          Classement
        </a>
        <button
          onClick={onStartQuiz}
          className="text-md font-light text-[#e4e4dc]"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  onStartQuiz: PropTypes.func.isRequired,
};

export default Navbar;
