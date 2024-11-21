import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri"; // Pour l'icône "Partners"

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 flex justify-center items-center gap-6">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition duration-300"
        aria-label="Partners"
      >
        <RiTeamLine size={35} />
      </a>
      <a
        href="https://github.com/mrickschf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition duration-300"
        aria-label="GitHub"
      >
        <FaGithub size={35} />
      </a>
      <a
        href="https://www.linkedin.com/in/emerick-gharbi/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition duration-300"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={35} />
      </a>
      <a
        href="mailto:emerick.sg@gmail.com"
        className="text-gray-400 hover:text-white transition duration-300"
        aria-label="Email"
      >
        <FaEnvelope size={35} />
      </a>
    </footer>
  );
};

export default Footer;
