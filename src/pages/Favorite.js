import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { verifyUser } from "../service/LocalStorage";
import { getFavoriteByUserId, removeFavoriteAPI } from "../service/NativeAPI";
import Menu from "../components/Menu";
import "../styles/Details.css";

export default function Favorite() {
  const [favorite, setFavorite] = useState([]);
  const [att, setAtt] = useState({});
  const [id_user, setId] = useState("");
  const history = useHistory();

  const verifyTipyOfFavorite = (fav) => {
    if (fav.related === "comics") return `/character/${fav.id_favorite}`;
    return `/comic/${fav.id_favorite}`;
  };

  useEffect(() => {
    const { email, id } = verifyUser(history);
    setId(id);
    console.log(id, "id ls");
    if (!email) return null;
    const func = async () => {
      const responseAPI = await getFavoriteByUserId(id);
      setFavorite(responseAPI);
    };
    func();
  }, [history]);

  useEffect(() => {
    setAtt(favorite);
  }, []);

  const removeFav = async (fav) => {
    console.log(fav.id);
    const resultAPI = await removeFavoriteAPI(fav.id);
    const responseAPI = await getFavoriteByUserId(id_user);
    setFavorite(responseAPI);
    console.log(resultAPI);
  };

  return (
    <div className="main-div-details">
      <header>
        <Menu />
      </header>
      <h2>Favorite</h2>
      <div>
        {favorite.map((fav, index) => (
          <div key={index}>
            <p>{fav.name}</p>
            <img
              className="character-pic"
              src={fav.url_image && fav.url_image}
              alt="Favorite Thumbnail"
            />
            <Link to={verifyTipyOfFavorite(fav)}>
              <p>More details</p>
            </Link>
            <button
              className="indiv-btn"
              type="button"
              onClick={() => removeFav(fav)}
            >
              Remove Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
