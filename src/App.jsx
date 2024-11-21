import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Eyes from "./components/Eyes.jsx";
import Ranked from "./components/Ranked.jsx";
import Loader from "./components/Loader.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Footer from "./components/Footer";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false); // Gère la transition vers la phase de quiz

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Temps total de chargement pour voir l'animation
  }, []);

  // Fonction pour démarrer le quiz depuis différentes sections
  const startQuiz = () => setIsGameActive(true);

  // Fonction pour retourner au classement après le quiz
  const endQuiz = () => setIsGameActive(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen bg-zinc-900 text-white">
          <Navbar onStartQuiz={startQuiz} />
          {isGameActive ? (
            <GameBoard onEndQuiz={endQuiz} /> // Affichage du quiz
          ) : (
            <>
              <LandingPage />
              <Marquee />
              <About onStartQuiz={startQuiz} />
              <Eyes />
              <Ranked />
              <Footer />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;
