import axios from "axios";
import { useHistory } from "react-router";
import { HEROS_BASE } from "../constants";

const { createContext, useState } = require("react");

export const herosContext = createContext({
  searchResults: [],
  searchIsLoading: false,
  search: () => null,
  heroDetails: null,
  loadHeroDetails: () => null,
  team: [],
  addToTeam: () => null,
  removeFromTeam: () => null,
});

export const HerosProvider = ({ children }) => {
  const teamInLocalStorage = localStorage.getItem("team") || "[]";
  const [searchResults, setSearchResults] = useState([]);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [heroDetails, setHeroDetails] = useState(null);
  const [team, setTeam] = useState(JSON.parse(teamInLocalStorage));
  const history = useHistory();
  const search = (name) => {
    setSearchIsLoading(true);
    axios
      .get(`${HEROS_BASE}search/${name}`)
      .then((res) => {
        setSearchResults(res.data.results || []);
      })
      .catch(() => {})
      .finally(() => {
        setSearchIsLoading(false);
      });
  };
  const loadHeroDetails = (heroId) => {
    setHeroDetails(null);
    axios.get(`${HEROS_BASE}${heroId}`).then((res) => {
      setHeroDetails(res.data);
    });
  };
  const addToTeam = (hero) => {
    if (hero.biography.alignment === "neutral") {
      alert("Solo buenos o malos");
      return;
    }
    const goods = team.filter(
      (hero) => hero.biography.alignment === "good"
    ).length;
    const bads = team.filter(
      (hero) => hero.biography.alignment === "bad"
    ).length;
    if (goods === 3 && hero.biography.alignment === "good") {
      alert("Ya tienes 3 héroes buenos");
      return;
    }
    if (bads === 3 && hero.biography.alignment === "bad") {
      alert("Ya tienes 3 héroes malos");
      return;
    }
    const newTeam = [...team, hero];
    setTeam(newTeam);
    localStorage.setItem("team", JSON.stringify(newTeam));
    alert("Se agregó el héroe al equipo con éxito");
    history.push("/home");
  };
  const removeFromTeam = (heroId) => {
    const newTeam = team.filter((hero) => hero.id !== heroId);
    setTeam(newTeam);
    localStorage.setItem("team", JSON.stringify(newTeam));
    alert("Se eliminó el héroe del equipo con éxito");
    history.push("/home");
  };
  return (
    <herosContext.Provider
      value={{
        searchResults,
        search,
        searchIsLoading,
        loadHeroDetails,
        heroDetails,
        team,
        addToTeam,
        removeFromTeam,
      }}
    >
      {children}
    </herosContext.Provider>
  );
};
