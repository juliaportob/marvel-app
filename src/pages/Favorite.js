import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { verifyUser } from "../service/LocalStorage";
import { getFavoriteByUserId } from "../service/NativeAPI";

export default function Favorite() {
  const [dataAPI, setDataAPI] = useState([]);
  const [comicTitle, setcomicTitle] = useState('');
  const [actualComic, setActualComic] = useState(null);
  const [att, setAtt] = useState({});
  const history = useHistory();

  useEffect(() => {
    const { email, id } = verifyUser(history);
    if(!email) return null;
    const func = async () => {
      const responseAPI = await getFavoriteByUserId(id);
      setDataAPI(responseAPI);
    }
    func();
  }, [history]);

  const verifyFavoriteType = (fav) => {
    if(fav.related === 'comics') return `/character/${fav.id_favorite}`;
    return `/comic/${fav.id_favorite}`;
  }

  return (
    <div >
      <h2>Favorite</h2>
      <div>
        {dataAPI.map((fav, index) => (
          <div key={index}>
            <p>{fav.name}</p>
            <img
              className="character-pic"
              src={fav.url_image && fav.url_image}
              alt="Favorite Thumbnail" />
            <Link to={verifyFavoriteType(fav)}>
              <p>More details</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
