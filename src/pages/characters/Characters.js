import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allCharactersURL } from '../../service/Endpoints';
import { getAllInfo } from '../../service/MarvelAPI';
import { getCharacterByName } from '../../service/NativeAPI';
import Input from '../../components/Input';
import Button from '../../components/Button';
import '../../styles/Characters.css'

export default function Characters() {
  const [dataAPI, setDataAPI] = useState([]);
  const [offset, setOffset] = useState(0);
  const [nameParameter, setNameParameter] = useState('');
  const [actualCharacter, setActualCharacter] = useState(null);
  const [att, setAtt] = useState({});

  const handleClick = () => {
    var count = offset + 10;
    return setOffset(count);
  };

  useEffect(() => {
    const func = async () => {
      const responseAPI = await getAllInfo(allCharactersURL, offset);
      setDataAPI(responseAPI);
    }
    func();
  }, [offset]);

  useEffect(() => {
    setAtt(actualCharacter);
  }, [actualCharacter])

  const searchCharacterByName = async () => {
    const result = await getCharacterByName(nameParameter);
    setActualCharacter(result);
  }

  const setField = (field, value) => {
    if (field === 'Search Character') return setNameParameter(value);
  };

  const cleanState = () => {
    setActualCharacter(null);
    setNameParameter('');
  };

  return (
    <div >
      <h2>Characters</h2>
      <div>
        <Input 
          title="Search Character"
          type="text"
          value={ nameParameter }
          onChange={ setField }
        />
        <Button 
          title="Search"
          className="indiv-btn"
          onClick={ async () => await searchCharacterByName() }
        />
        <button type="button" onClick={() => cleanState()}>Get All</button>
      </div>
      <div>
        { 
        actualCharacter === null ?
        dataAPI.map((character, index) => (
          <div key={ index }>
            <p>{ character.name }</p>
            <img
              className="character-pic"
              src={ `${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt="Character Thumbnail"/>
            <Link to={`/character/${character.id}`}>
              <p>More details</p>
            </Link>
          </div>
        )) : 
        <div>
          <p>{ actualCharacter.name }</p>
          <img
            className="character-pic"
            src={ actualCharacter.image && actualCharacter.image }
            alt="Character Thumbnail"/>
          <Link to={`/character/${actualCharacter.id}`}>
            <p>More details</p>
          </Link>
        </div> 
        }
      </div>
      <div>
        <button type="button" onClick={() => handleClick()}>Next</button>
      </div>
    </div>
  );
}