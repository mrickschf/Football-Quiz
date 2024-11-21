import { motion } from "framer-motion";

function Marquee() {
  return (
    <div
      className="w-full py-20 rounded-tl-3xl rounded-tr-3xl bg-green-900"
      style={{ backgroundColor: "#004D43" }}
    >
      <div className="text-[#e4e4dc] border-t-2 border-b-2 border-zinc-300 flex gap-10 overflow-hidden whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <motion.h1
            key={i}
            initial={{ x: 0 }}
            animate={{ x: ["0%", "-100%"] }} // Change to array for smoother transition
            transition={{
              ease: "linear",
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: "0",
              // Add the property `repeatDelay` to ensure smooth transition
            }}
            className="text-[17vw] leading-none font-founders uppercase pt-10 mb-20 font-bold"
          >
            Football Quizz
          </motion.h1>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
