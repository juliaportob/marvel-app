import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { allComicsURL, generalEndpoint1, generalEndpoint2 } from '../../service/Endpoints';
import { getAllInfo, getByTitle } from '../../service/MarvelAPI';
import Input from '../../components/Input';
import Button from '../../components/Button';
import '../../styles/Characters.css'

export default function Comics() {
  const [dataAPI, setDataAPI] = useState([]);
  const [offset, setOffset] = useState(0);
  const [nameParameter, setNameParameter] = useState('');
  const [actualComic, setActualComic] = useState(null);
  const [att, setAtt] = useState({});
  const history = useHistory();

  const handleClick = () => {
    var count = offset + 10;
    return setOffset(count);
  };

  useEffect(() => {
    const func = async () => {
      const responseAPI = await getAllInfo(allComicsURL, offset);
      setDataAPI(responseAPI);
      console.log(dataAPI, 'data apiiiiiiiiiiiii');
    }
    func();
  }, [offset]);

  useEffect(() => {
    setAtt(actualComic);
  }, [actualComic])

  const searchComicByName = async () => {
    const result = await getByTitle(generalEndpoint1, 'comics', nameParameter, generalEndpoint2);
    setActualComic(result);
  }

  const setField = (field, value) => {
    if (field === 'Search Comic') return setNameParameter(value);
  };

  const cleanState = () => {
    setActualComic(null);
    setNameParameter('');
  };

  return (
    <div >
      <h2>Comics</h2>
      <div>
        <Input 
          title="Search Comic"
          type="text"
          value={ nameParameter }
          onChange={ setField }
        />
        <Button 
          title="Search"
          className="indiv-btn"
          onClick={ async () => await searchComicByName() }
        />
        <button type="button" onClick={() => cleanState()}>Get All</button>
      </div>
      <div>
        { 
        actualComic === null ?
        dataAPI.map((comic, index) => (
          <div key={ index }>
            <p>{ comic.title }</p>
            <img
              className="comic-pic"
              src={ `${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt="Comic Thumbnail"/>
            <Link to={`/comic/${comic.id}`}>
              <p>More details</p>
            </Link>
          </div>
        )) : 
        <div>
          <p>{ actualComic.title }</p>
          <img
            className="comic-pic"
            src={ `${actualComic.thumbnail && actualComic.thumbnail.path}.${actualComic.thumbnail && actualComic.thumbnail.extension}`}
            alt="Comic Thumbnail"/>
          <Link to={`/comic/${actualComic.id}`}>
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