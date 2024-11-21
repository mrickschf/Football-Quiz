import PropTypes from "prop-types";

const InputGuess = ({ userGuess, setUserGuess, onGuessSubmit }) => {
  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuessSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs flex flex-col items-center"
    >
      <input
        type="text"
        value={userGuess}
        onChange={handleInputChange}
        className="input-guess text-black p-2 rounded-md text-center mb-4 w-full"
        placeholder="Devine le joueur"
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
      >
        Soumettre
      </button>
    </form>
  );
};

// Ajout de la validation des props
InputGuess.propTypes = {
  userGuess: PropTypes.string.isRequired,
  setUserGuess: PropTypes.func.isRequired,
  onGuessSubmit: PropTypes.func.isRequired,
};

export default InputGuess;
