import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { herosContext } from "../contexts/heros-context";
import { FaTrashAlt, FaRegPlusSquare } from "react-icons/fa";
import "./herodetails.css";
import { Link } from "react-router-dom";
function HeroDetails() {
  const { heroDetails, loadHeroDetails, addToTeam, removeFromTeam, team } =
    useContext(herosContext);
  const params = useParams();
  useEffect(() => {
    loadHeroDetails(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!heroDetails) {
    return <h1>Cargando...</h1>;
  }
  const isInTeam = team.find((hero) => hero.id === heroDetails.id);
  return (
    <div class="container card">
      <div class="text-center">
        <h1 class="font-weight-bold superFont  btn-detail ">
          {heroDetails.name}&nbsp;
          {!isInTeam && (
            <button
              class=" btn btn-primary mt-3 "
              onClick={() => addToTeam(heroDetails)}
            >
              <FaRegPlusSquare /> Agregar al equipo
            </button>
          )}
          {isInTeam && (
            <button onClick={() => removeFromTeam(heroDetails.id)}>
              <FaTrashAlt /> Eliminar del equipo
            </button>
          )}
        </h1>
      </div>
      <img src={heroDetails.image.url} class="img-results img-search" alt="" />
      <div class="font-weight-bold superFont text-center  py-2">
        <p>Peso: {heroDetails.appearance.weight[1]}</p>
        <p>Altura: {heroDetails.appearance.height[1]}</p>
        <p>Nombre real: {heroDetails.biography["full-name"]}</p>
        <p>Alias: {heroDetails.biography.aliases.join(", ")}</p>
        <p>Color de ojos: {heroDetails.appearance["eye-color"]}</p>
        <p>Color de cabello: {heroDetails.appearance["hair-color"]}</p>
        <p>Trabajo: {heroDetails.work.occupation}</p>
        <Link to="/search" class="btn btn-danger  btn-detail">
          volver
        </Link>
      </div>
    </div>
  );
}

export default HeroDetails;
