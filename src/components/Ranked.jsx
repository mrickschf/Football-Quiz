import { FaMedal } from "react-icons/fa";

function Ranked() {
  const players = [
    { rank: 1, name: "Player1", score: 1500 },
    { rank: 2, name: "Player2", score: 1300 },
    { rank: 3, name: "Player3", score: 1100 },
    { rank: 4, name: "Player4", score: 1000 },
    { rank: 5, name: "Player5", score: 900 },
    // Ajoute d'autres joueurs
  ];

  return (
    <div id="ranked" className="w-full py-20 bg-zinc-900 text-[#e4e4dc]">
      <div className="w-full px-20 border-b-[1px] border-zinc-500 pb-20">
        <h1 className="text-7xl font-founders tracking-tight mb-10">
          Classement :
        </h1>

        {/* Tableau de classement */}
        <div className="ranking-table bg-gray-800 p-5 rounded-lg shadow-lg">
          {players.map((player, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 mb-3 rounded-lg transition-transform duration-500 ease-out transform hover:scale-105 ${
                player.rank === 1
                  ? "bg-yellow-500 text-black"
                  : player.rank === 2
                  ? "bg-gray-400 text-black"
                  : player.rank === 3
                  ? "bg-orange-500 text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              {/* Rang avec médaille pour le top 3 */}
              <div className="flex items-center gap-2">
                {player.rank <= 3 ? (
                  <FaMedal
                    className={`text-3xl ${
                      player.rank === 1
                        ? "text-yellow-400"
                        : player.rank === 2
                        ? "text-gray-300"
                        : "text-orange-400"
                    }`}
                  />
                ) : (
                  <span className="text-2xl font-semibold">{player.rank}</span>
                )}
                <span className="text-lg font-medium">{player.name}</span>
              </div>

              {/* Score du joueur */}
              <span className="text-lg font-bold">{player.score}</span>

              {/* Barre de progression vers le rang suivant */}
              <div className="w-1/3 h-3 bg-zinc-600 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-width duration-500 ease-out"
                  style={{
                    width: `${Math.min((player.score / 1500) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ranked;
