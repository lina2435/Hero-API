import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { herosContext } from "../contexts/heros-context";
import "./search.css";
import { FaArrowCircleLeft } from "react-icons/fa";

function Search() {
  const { search, searchResults, searchIsLoading } = useContext(herosContext);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      search(values.name);
    },
  });
  return (
    <div class="wrapper">
      <div class="row">
        <div class="back-icon">
          <Link to="/heroDetails">
            <FaArrowCircleLeft />
            Home
          </Link>
        </div>
        <form
          className="card d-flex align-items-center  "
          onSubmit={formik.handleSubmit}
        >
          <div class="card-body text-center col-md-4 input-n my-auto my-auto">
            <div>
              <label htmlFor="name" class=" my-2 h4 superFont">
                Busca por nombre :{" "}
              </label>
              <div class="col">
                <input
                  class="form-control text-center form-control-lg form-control-borderless"
                  type="search"
                  id="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
            </div>
            <div class="col-auto">
              <button class="btn btn-lg btn-success my-3" type="submit">
                Buscar
              </button>
            </div>
          </div>
        </form>
        {searchIsLoading && <h3>Cargando...</h3>}
        <ul class="img-results text-center  img-position">
          {searchResults.map((result) => (
            <div class="img-results  ">
              <li class="list-img  ">
                <Link to={`/details/${result.id}`}>
                  <img
                    class="img-thumbnail img-search  "
                    src={result.image.url}
                    height="80"
                    alt=""
                  />
                  <figcaption class="results-name ">{result.name}</figcaption>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
