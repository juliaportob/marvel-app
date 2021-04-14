import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getComicByTitle, getAllComics } from "../../service/NativeAPI";
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
      const responseAPI = await getAllComics(offset);
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
      <div className="cha-input">
        <Input
          title="Search Comic"
          type="text"
          className="indiv-input-cha"
          value={comicTitle}
          onChange={setField}
        />
        </div>
        <div className="btns-cha">
        <Button
          title="Search"
          className="indiv-btn-cha"
          onClick={async () => await searchComicByName()}
        />
        <button
          className="indiv-btn-cha"
          type="button"
          onClick={() => cleanState()}
        >
          Get All
        </button>
        </div>
      </div>
      <div className="all-characters">
        {actualComic === null ? (
          dataAPI.map((comic, index) => (
            <div className="indiv-cha" key={index}>
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
          className="indiv-btn-cha"
          type="button"
          onClick={() => handleClick()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
