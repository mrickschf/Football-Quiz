const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black overflow-hidden">
      <div className="logo-animation">
        <img
          src={"src/assets/Football_Quiz_Logo.png"}
          alt="Logo"
          className="w-48 h-auto"
        />
      </div>

      <style>
        {`
          .logo-animation {
            position: relative;
            animation: slide-in 1.5s ease forwards, fade-out 1s ease 1.5s forwards;
          }

          @keyframes slide-in {
            0% {
              transform: translate(-100%, 100%);
              opacity: 0;
            }
            100% {
              transform: translate(0, 0);
              opacity: 1;
            }
          }

          @keyframes fade-out {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translate(100%, -100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
