import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getCharacterById } from '../../service/NativeAPI';
import { verifyUser } from "../../service/LocalStorage";
import '../../styles/Characters.css'

export default function CharacterDetail({ match: { params: { id } } }) {
  const [character, setCharacter] = useState([]);
  const history = useHistory();

  useEffect(() => {
    verifyUser(history);
    const getCharacterId = async () => {
      const result = await getCharacterById(id);
      setCharacter(result);
      console.log(character, 'resposta api')
    };
    getCharacterId();
  }, [history, id]);

  const getComicId = (charact) => {
    const splittedId = charact.resourceURI.split('/');
    const rightId = splittedId[6];
    return rightId;
  }

  return (
    <div >
      <h2>Character's Detail</h2>
      <div>
        <h3>{ character.name }</h3>
        <img
          className="character-pic"
          src={ `${character.image && character.image}`}
          alt="Character Thumbnail"
        />
        <p>{ character.description && character.description }</p>
        <h4>Comics:</h4>
        {character.comics && character.comics.map((element, index) => (
          <div key={ index }>
            <Link to={`/comic/${getComicId(element)}`}>{ element.name }</Link>
          </div>
        ))}
        <a href={character.externalInformation && character.externalInformation}>External information</a>
      </div> 
    </div>
  );
}