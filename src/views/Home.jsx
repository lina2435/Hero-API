import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { herosContext } from "../contexts/heros-context";
//import HeroDetails from "./HeroDetails";
import "./home.css";
import { FaTrashAlt } from "react-icons/fa";

const calculateAverageForPowerstat = (team, powerstat) => {
  const teamPowerstat = team.reduce(
    (acc, hero) => acc + Number(hero.powerstats[powerstat]),
    0
  );
  const teamQuantity = team.length;
  return teamPowerstat / teamQuantity;
};

const calculateAverageWeight = (team, powerstat) => {
  const teamPowerstat = team.reduce(
    (acc, hero) => acc + Number(hero.appearance.weight[1].replace(" kg", "")),
    0
  );
  const teamQuantity = team.length;
  return teamPowerstat / teamQuantity;
};

const calculateAverageheight = (team, powerstat) => {
  const teamPowerstat = team.reduce(
    (acc, hero) => acc + Number(hero.appearance.height[1].replace(" cm", "")),
    0
  );
  const teamQuantity = team.length;
  return teamPowerstat / teamQuantity;
};

function Home() {
  const { team, removeFromTeam } = useContext(herosContext);
  let bestAverage = "";
  const combatAverage = calculateAverageForPowerstat(team, "combat");
  const durabilityAverage = calculateAverageForPowerstat(team, "durability");
  const intelligenceAverage = calculateAverageForPowerstat(
    team,
    "intelligence"
  );
  const powerAverage = calculateAverageForPowerstat(team, "power");
  const speedAverage = calculateAverageForPowerstat(team, "speed");
  const strengthAverage = calculateAverageForPowerstat(team, "strength");
  if (
    [
      durabilityAverage,
      intelligenceAverage,
      powerAverage,
      speedAverage,
      strengthAverage,
    ].every((average) => average < combatAverage)
  ) {
    bestAverage = "Combate";
  }
  if (
    [
      combatAverage,
      durabilityAverage,
      intelligenceAverage,
      powerAverage,
      speedAverage,
      strengthAverage,
    ].every((average) => average < durabilityAverage)
  ) {
    bestAverage = "Durabilidad";
  }
  if (
    [
      combatAverage,
      durabilityAverage,
      powerAverage,
      speedAverage,
      strengthAverage,
    ].every((average) => average < intelligenceAverage)
  ) {
    bestAverage = "Inteligencia";
  }
  if (
    [
      combatAverage,
      durabilityAverage,
      intelligenceAverage,
      speedAverage,
      strengthAverage,
    ].every((average) => average < powerAverage)
  ) {
    bestAverage = "Poder";
  }
  if (
    [
      combatAverage,
      durabilityAverage,
      intelligenceAverage,
      powerAverage,
      strengthAverage,
    ].every((average) => average < speedAverage)
  ) {
    bestAverage = "Velocidad";
  }
  if (
    [
      combatAverage,
      durabilityAverage,
      intelligenceAverage,
      powerAverage,
      speedAverage,
    ].every((average) => average < strengthAverage)
  ) {
    bestAverage = "Fuerza";
  }
  return (
    <div class="container">
      <div class="text-center">
        <div class="font-weight-bold superFont mt-4">
          <h1>Equipo</h1>
          <div>
            <ul class="text-style">
              {team.map((hero) => (
                <li>
                  {hero.name}&nbsp;
                  <button
                    class="btn ml-5"
                    onClick={() => removeFromTeam(hero.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div class="font-weight-bold superFont text-center  py-2">
            <h3>Estadísticas</h3>
            <div class="selec-hero">
              <ul class="text-style ">
                <li>
                  <p>Mejor estadística: {bestAverage}</p>
                </li>
                <li>
                  <span>
                    Peso promedio: {calculateAverageWeight(team).toFixed(2)} kg
                  </span>
                </li>
                <li>
                  <span>
                    Altura promedio: {calculateAverageheight(team).toFixed(2)}{" "}
                    cm
                  </span>
                </li>
                <li>
                  <span>Combate: {combatAverage.toFixed(2)}</span>
                </li>
                <li>
                  <span>Durabilidad: {durabilityAverage.toFixed(2)}</span>
                </li>
                <li>
                  <span>Inteligencia: {intelligenceAverage.toFixed(2)}</span>
                </li>
                <li>
                  <span>Poder: {powerAverage.toFixed(2)}</span>
                </li>
                <li>
                  <span>Velocidad: {speedAverage.toFixed(2)}</span>
                </li>
                <li>
                  <span>Fuerza: {strengthAverage.toFixed(2)}</span>
                </li>
              </ul>
            </div>
          </div>
          <h2>Forma tu equipo!!</h2>
          <ul>
            <li>
              <Link to="/search" class="btn btn-primary">
                Buscar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Home;
