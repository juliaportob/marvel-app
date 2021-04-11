import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getComicById } from '../../service/NativeAPI';
import { verifyUser } from "../../service/LocalStorage";


export default function ComicDetail({ match: { params: { id } } }) {
  const [comic, setComic] = useState([]);
  const history = useHistory();

  useEffect(() => {
    verifyUser(history);
    const getComicId = async () => {
      const result = await getComicById(id);
      setComic(result);
    };
    getComicId();
  }, [history, id]);

  const getCharacterId = (cmc) => {
    const splittedId = cmc.resourceURI.split("/");
    const rightId = splittedId[6];
    return rightId;
  };

  return (
    <div>
      <h2>Comic's Detail</h2>
      <div>
        <h3>{comic.title}</h3>
        <img
          className="comic-pic"
          src={ comic.image && comic.image }
          alt="Comic Thumbnail"
        />
        <p>{comic.description && comic.description}</p>
        {comic.characters && comic.characters.length > 0 ? (
          <h4>Characters:</h4>
        ) : (
          ""
        )}
        {comic.characters &&
          comic.characters.map((element, index) => (
            <div key={index}>
              <Link to={`/character/${getCharacterId(element)}`}>
                {element.name}
              </Link>
            </div>
          ))}
        <a href={comic.externalInformation && comic.externalInformation}>External information</a>
      </div>
    </div>
  );
}
