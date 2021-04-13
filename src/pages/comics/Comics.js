import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllInfo } from "../../service/MarvelAPI";
import { getComicByTitle } from "../../service/NativeAPI";
import { verifyUser } from "../../service/LocalStorage";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Menu from "../../components/Menu";
import "../../styles/Characters.css";

export default function Comics() {
  const [dataAPI, setDataAPI] = useState([]);
  const [offset, setOffset] = useState(0);
  const [comicTitle, setcomicTitle] = useState("");
  const [actualComic, setActualComic] = useState(null);
  const [att, setAtt] = useState({});
  const history = useHistory();

  const handleClick = () => {
    var count = offset + 10;
    return setOffset(count);
  };

  useEffect(() => {
    verifyUser(history);
    const func = async () => {
      const responseAPI = await getAllInfo('comics', offset);
      setDataAPI(responseAPI);
    };
    func();
  }, [offset]);

  useEffect(() => {
    setAtt(actualComic);
  }, [actualComic]);

  const searchComicByName = async () => {
    const result = await getComicByTitle(comicTitle);
    setActualComic(result);
  };

  const setField = (field, value) => {
    if (field === "Search Comic") return setcomicTitle(value);
  };

  const cleanState = () => {
    setActualComic(null);
    setcomicTitle("");
  };

  return (
    <div className="main-div-characters">
      <header>
        <Menu />
      </header>
      <h2>Comics</h2>
      <div className="main-btns">
        <Input
          title="Search Comic"
          type="text"
          className="search-input"
          value={comicTitle}
          onChange={setField}
        />
        <Button
          title="Search"
          className="indiv-btn"
          onClick={async () => await searchComicByName()}
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
        {actualComic === null ? (
          dataAPI.map((comic, index) => (
            <div key={index}>
              <p>{comic.title}</p>
              <img
                className="character-pic"
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt="Comic Thumbnail"
              />
              <Link to={`/comic/${comic.id}`}>
                <p>More details</p>
              </Link>
            </div>
          ))
        ) : (
          <div>
            <p>{actualComic.title}</p>
            <img
              className="comic-pic"
              src={actualComic.image && actualComic.image}
              alt="Comic Thumbnail"
            />
            <Link to={`/comic/${actualComic.id}`}>
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
