import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generalEndpoint1, generalEndpoint2 } from '../../service/Endpoints';
import { getById } from '../../service/MarvelAPI';

export default function ComicDetail({
  match: {
    params: { id },
  },
}) {
  const [comic, setComic] = useState([]);

  useEffect(() => {
    const getComicId = async () => {
      const result = await getById(
        generalEndpoint1,
        "comics",
        id,
        generalEndpoint2
      );
      setComic(result);
    };
    getComicId();
  }, [id]);

  const getCharacterId = (cmc) => {
    const splittedId = cmc.resourceURI.split("/");
    const rightId = splittedId[6];
    return rightId;
  };

  return (
    <div>
      <h2>Comic's Detail</h2>
      <div>
        <h3>{comic.name}</h3>
        <img
          className="comic-pic"
          src={`${comic.thumbnail && comic.thumbnail.path}.${
            comic.thumbnail && comic.thumbnail.extension
          }`}
          alt="Comic Thumbnail"
        />
        <p>{comic.description && comic.description}</p>
        {comic.characters && comic.characters.items.length > 0 ? (
          <h4>Characters:</h4>
        ) : (
          ""
        )}
        {comic.characters &&
          comic.characters.items.map((element, index) => (
            <div key={index}>
              <Link to={`/character/${getCharacterId(element)}`}>
                {element.name}
              </Link>
            </div>
          ))}
        <a href={comic.urls && comic.urls[0].url}>External information</a>
      </div>
    </div>
  );
}
