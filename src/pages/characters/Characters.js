import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getCharacterByName, getAllCharacters } from "../../service/NativeAPI";
import { verifyUser } from "../../service/LocalStorage";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Menu from "../../components/Menu";
import "../../styles/Characters.css";

export default function Characters() {
  const [dataAPI, setDataAPI] = useState([]);
  const [offset, setOffset] = useState(0);
  const [nameParameter, setNameParameter] = useState("");
  const [actualCharacter, setActualCharacter] = useState(null);
  const [att, setAtt] = useState({});
  const history = useHistory();

  const handleClick = () => {
    var count = offset + 10;
    return setOffset(count);
  };

  useEffect(() => {
    verifyUser(history);
    const func = async () => {
      const responseAPI = await getAllCharacters(offset);
      setDataAPI(responseAPI);
    };
    func();
  }, [history, offset]);

  useEffect(() => {
    setAtt(actualCharacter);
  }, [actualCharacter]);

  const searchCharacterByName = async () => {
    const result = await getCharacterByName(nameParameter);
    setActualCharacter(result);
  };

  const setField = (field, value) => {
    if (field === "Search Character") return setNameParameter(value);
  };

  const cleanState = () => {
    setActualCharacter(null);
    setNameParameter("");
  };

  return (
    <div className="main-div-characters">
      <header>
        <Menu />
      </header>
      <h2>Characters</h2>
      <div className="main-btns">
        <Input
          title="Search Character"
          type="text"
          className="search-input"
          value={nameParameter}
          onChange={setField}
        />
        <Button
          title="Search"
          className="indiv-btn"
          onClick={async () => await searchCharacterByName()}
        />
        <button
          className="indiv-btn"
          type="button"
          onClick={() => cleanState()}
        >
          Get All
        </button>
      </div>
      <div className="all-characters">
        {actualCharacter === null ? (
          dataAPI.map((character, index) => (
            <div key={index}>
              <p>{character.name}</p>
              <img
                className="character-pic"
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt="Character Thumbnail"
              />
              <Link to={`/character/${character.id}`}>
                <p>More details</p>
              </Link>
            </div>
          ))
        ) : (
          <div className="unique-character">
            <p>{actualCharacter.name}</p>
            <img
              className="character-pic"
              src={actualCharacter.image && actualCharacter.image}
              alt="Character Thumbnail"
            />
            <Link to={`/character/${actualCharacter.id}`}>
              <p>More details</p>
            </Link>
          </div>
        )}
      </div>
      <div>
        <button
          className="indiv-btn"
          type="button"
          onClick={() => handleClick()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
