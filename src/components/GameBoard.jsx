import { useState, useEffect, useRef, useCallback } from "react";

import { motion } from "framer-motion";

import { getPlayersByTeam, getTeamByName } from "../api";

import BGStade2 from "../assets/BGStade2.webp";

import DefaultBadge from "../assets/default-badge.webp";

// Liste des clubs populaires

const popularTeams = [
  { id: "133602", name: "Manchester United" },

  { id: "133604", name: "Real Madrid" },

  { id: "133616", name: "FC Barcelona" },

  { id: "133612", name: "Juventus" },

  { id: "133613", name: "Bayern Munich" },

  { id: "133619", name: "PSG" },

  { id: "133605", name: "Liverpool" },

  { id: "133606", name: "AC Milan" },

  { id: "133603", name: "Chelsea" },

  { id: "134296", name: "Inter Milan" },
];

const GameBoard = () => {
  const [playerData, setPlayerData] = useState(null);

  const [userGuess, setUserGuess] = useState("");

  const [message, setMessage] = useState("");

  const [score, setScore] = useState(0);

  const [countdown, setCountdown] = useState(5);

  const [showCountdown, setShowCountdown] = useState(false);

  const [showStartButton, setShowStartButton] = useState(true);

  const [error, setError] = useState(null);

  const soundEffectCorrect = useRef(
    new Audio("/assets/sounds/correct-sound.mp3")
  );

  const soundEffectIncorrect = useRef(
    new Audio("/assets/sounds/incorrect-sound.mp3")
  );

  const soundEffectBadge = useRef(new Audio("/assets/sounds/badge-sound.mp3"));

  // Fonction pour charger les badges des clubs réels uniquement

  const fetchClubBadges = async (randomPlayer) => {
    const clubNames = [randomPlayer.strTeam, randomPlayer.strTeam2].filter(
      Boolean
    );

    const description = randomPlayer.strDescriptionEN || "";

    const clubsFromDescription = [];

    const popularClubNames = popularTeams.map((team) => team.name);

    // Vérifie si certains clubs populaires sont mentionnés dans la description

    popularClubNames.forEach((clubName) => {
      if (description.includes(clubName) && !clubNames.includes(clubName)) {
        clubsFromDescription.push(clubName);
      }
    });

    // Utiliser les clubs extraits pour compléter la liste sans doublons

    const finalClubNames = [
      ...new Set([...clubNames, ...clubsFromDescription]),
    ];

    // Chargement des badges pour tous les clubs uniques obtenus

    const clubsWithBadges = await Promise.all(
      finalClubNames.slice(0, 6).map(async (clubName) => {
        const teamData = await getTeamByName(clubName);

        return {
          name: clubName,

          badgeUrl: teamData ? teamData.strBadge : DefaultBadge,
        };
      })
    );

    console.log("Clubs avec badges récupérés :", clubsWithBadges);

    return clubsWithBadges;
  };

  // Fonction pour charger un joueur aléatoire avec ses clubs réels et passés

  const fetchRandomPlayerData = useCallback(async () => {
    try {
      const randomTeam =
        popularTeams[Math.floor(Math.random() * popularTeams.length)];

      const players = await getPlayersByTeam(randomTeam.id);

      if (!players || players.length === 0) {
        throw new Error(`Aucun joueur trouvé pour l'équipe ${randomTeam.name}`);
      }

      const randomPlayer = players[Math.floor(Math.random() * players.length)];

      console.log("Joueur sélectionné :", randomPlayer);

      const clubsWithBadges = await fetchClubBadges(randomPlayer);

      setPlayerData({
        clubs: clubsWithBadges,

        correctAnswer: randomPlayer.strPlayer,
      });

      soundEffectBadge.current.play();

      setError(null);
    } catch (err) {
      console.error("Erreur lors du chargement du joueur :", err);

      setError("Une erreur est survenue lors du chargement du joueur.");
    }
  }, []);

  useEffect(() => {
    fetchRandomPlayerData();
  }, [fetchRandomPlayerData]);

  const startCountdown = () => {
    setShowStartButton(false);

    setShowCountdown(true);
  };

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown("Go!");

      setTimeout(() => setShowCountdown(false), 1000);
    }
  }, [countdown, showCountdown]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userGuess.toLowerCase() === playerData.correctAnswer.toLowerCase()) {
      setMessage("Correct! 🎉");

      setScore(score + 1);

      soundEffectCorrect.current.play();

      fetchRandomPlayerData();

      setUserGuess("");
    } else {
      setMessage("Incorrect, essayez encore !");

      soundEffectIncorrect.current.play();
    }
  };

  // Mise à jour de handleSkip pour appeler fetchRandomPlayerData et récupérer un nouveau joueur

  const handleSkip = () => {
    setMessage("");

    setUserGuess("");

    fetchRandomPlayerData(); // Appelle la fonction pour récupérer un nouveau joueur
  };

  if (error) return <div className="text-red-500">{error}</div>;

  if (!playerData) return <div>Chargement des données...</div>;

  return (
    <motion.div
      className="game-board-container flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${BGStade2})`,

        backgroundSize: "cover",

        backgroundPosition: "center",

        padding: "20px",

        minHeight: "100vh",
      }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {showStartButton ? (
        <motion.div
          className="start-button-overlay flex flex-col items-center justify-center absolute inset-0 bg-black bg-opacity-75 text-white text-4xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-8">Prêt à jouer ?</p>

          <button
            onClick={startCountdown}
            className="bg-[#CDEA68] text-black px-6 py-3 rounded text-2xl font-semibold hover:bg-green-600 transition duration-300"
          >
            Commencer
          </button>
        </motion.div>
      ) : showCountdown ? (
        <motion.div
          className="countdown-overlay flex items-center justify-center absolute inset-0 bg-black bg-opacity-75 text-white text-6xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {countdown}
        </motion.div>
      ) : (
        <>
          <h2 className="font-founders text-5xl font-semibold mb-4 text-[#CDEA68] text-center">
            Devinez le joueur sur la base de sa carrière
          </h2>

          <p className="text-2xl text-white mb-6">Score : {score}</p>

          <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md">
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Saisissez votre réponse ici"
              className="p-3 rounded bg-gray-700 text-white border border-[#fdfdb3] w-full"
            />

            <div className="flex justify-between mt-2">
              <button
                type="button"
                onClick={handleSkip}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Passer
              </button>

              <button
                type="submit"
                className="bg-[#CDEA68] text-black px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Envoyer
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-4">
            {playerData.clubs.map((club, index) => (
              <motion.div
                key={index}
                className="relative group flex items-center justify-center w-28 h-28 bg-gray-800 rounded-full border-4 border-[#CDEA68] p-2"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <img
                  src={club.badgeUrl}
                  alt={`Badge de ${club.name}`}
                  className="w-20 h-20 object-contain"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-semibold">
                    {club.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {message && (
            <motion.div
              className={`mt-4 ${
                message === "Correct! 🎉" ? "text-[#FFD700]" : "text-red-500"
              } font-bold text-2xl`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {message}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default GameBoard;
