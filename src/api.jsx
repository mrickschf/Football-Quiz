import axios from "axios";

const API_BASE_URL = "https://www.thesportsdb.com/api/v1/json/3"; // Remplacez YOUR_API_KEY par votre clé API

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fonction pour récupérer les informations d'une équipe par son nom

export const getTeamByName = async (teamName) => {
  try {
    const response = await api.get(
      `/searchteams.php?t=${encodeURIComponent(teamName)}`
    );

    return response.data.teams[0]; // Récupère la première équipe correspondant au nom
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de l'équipe :",
      error
    );

    return null;
  }
};

// Fonction pour récupérer tous les joueurs d'une équipe par son ID

export const getPlayersByTeam = async (teamId) => {
  try {
    const response = await api.get(`/lookup_all_players.php?id=${teamId}`);

    return response.data.player; // Retourne la liste des joueurs de l'équipe
  } catch (error) {
    console.error("Erreur lors de la récupération des joueurs :", error);

    return [];
  }
};
