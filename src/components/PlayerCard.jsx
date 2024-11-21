import PropTypes from "prop-types";

import { motion } from "framer-motion";

const PlayerCard = ({ playerData }) => {
  return (
    <div className="player-card bg-gray-800 bg-opacity-50 p-4 rounded-md shadow-md text-center w-[30vw] h-[25vw] mb-4">
      <h2 className="font-founders text-3xl font-semibold mb-2 text-[#CDEA68]">
        Clubs joués
      </h2>

      <ul className="flex flex-wrap justify-center gap-4 font-neue">
        {playerData.clubs.map((club, index) => (
          <motion.li
            key={index}
            className="flex items-center flex-col relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Cercle autour du badge */}

            <div className="flex items-center justify-center w-28 h-28 rounded-full border-4 border-[#CDEA68]">
              <motion.img
                src={club.badgeUrl || "https://via.placeholder.com/50"}
                alt={club.name}
                className="w-24 h-24 object-contain mb-1 transition-transform duration-300"
              />
            </div>

            {/* Bulle d'information pour le nom du club */}

            <motion.div
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-32 bg-black text-white text-center rounded-md p-2 opacity-0 pointer-events-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0 }}
              whileHover={{
                opacity: 1,

                y: -10,
              }}
            >
              {club.name}
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

PlayerCard.propTypes = {
  playerData: PropTypes.shape({
    clubs: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,

        badgeUrl: PropTypes.string,
      })
    ).isRequired,

    correctAnswer: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlayerCard;
