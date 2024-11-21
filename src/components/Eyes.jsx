import { useEffect, useState } from "react";
import BGStade from "../assets/BGStade.webp";

function Eyes() {
  const [rotate, setRotate] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Suivi des mouvements du curseur pour l'effet de "projecteur"
      setMousePosition({ x: mouseX, y: mouseY });

      const deltaX = mouseX - window.innerWidth / 2;
      const deltaY = mouseY - window.innerHeight / 2;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="login"
      className="eyes w-full h-screen cursor-pointer overflow-hidden relative"
    >
      {/* Arrière-plan masqué par défaut */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          maskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 150px, black 200px)`,
          WebkitMaskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, transparent 150px, black 200px)`,
          backgroundImage: `url(${BGStade})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Animation des yeux */}
      <div className="absolute flex gap-10 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <div className="flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-white">
          <div className="relative w-2/3 h-2/3 rounded-full bg-zinc-900">
            <div
              style={{
                transform: `translate(-50%,-50%) rotate(${rotate}deg)`,
              }}
              className="line absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-10"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-100"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-white">
          <div className="relative w-2/3 h-2/3 rounded-full bg-zinc-900">
            <div
              style={{
                transform: `translate(-50%,-50%) rotate(${rotate}deg)`,
              }}
              className="line absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-10"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-100"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire de connexion centré à droite */}
      <div className="absolute top-1/4 mt-[12vw] right-10 transform -translate-y-1/2 bg-zinc-900 bg-opacity-80 p-6 rounded-xl shadow-lg text-white max-w-xs text-center">
        <h2 className="text-xl font-semibold mb-4">Connexion</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="mb-4 px-4 py-2 w-full rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="mb-6 px-4 py-2 w-full rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
        />
        <button className="bg-[#CDEA68] text-zinc-900 px-4 py-2 rounded-full hover:bg-[#A1B562] transition duration-300">
          Se connecter
        </button>
      </div>
    </div>
  );
}

export default Eyes;
