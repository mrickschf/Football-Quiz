import PropTypes from "prop-types"; // Import de PropTypes

const Score = ({ score, attempts }) => {
  return (
    <div className="score bg-gray-900 p-2 rounded-md shadow-md text-center mb-4 w-full max-w-xs">
      <h2 className="text-lg font-semibold">Score : {score}</h2>
      <p>Tentatives restantes : {attempts}</p>
    </div>
  );
};

// Ajout de la validation des props
Score.propTypes = {
  score: PropTypes.number.isRequired,
  attempts: PropTypes.number.isRequired,
};

export default Score;
